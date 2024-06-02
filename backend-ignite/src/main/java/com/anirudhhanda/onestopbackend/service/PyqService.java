package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.exceptions.AccessDeniedExceptionAdmin;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateCourseException;
import com.anirudhhanda.onestopbackend.modal.Pyq;
import com.anirudhhanda.onestopbackend.repository.PyqRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PyqService {
    @Autowired
    private final PyqRepository pyqRepository;
    @Autowired
    private final AppUserRepository appUserRepository;
    @Autowired
    private final UserService userService;
    @Autowired
    private final CourseRepository courseRepository;

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public PyqService(PyqRepository pyqRepository, AppUserRepository appUserRepository, UserService userService, CourseRepository courseRepository) {
        this.pyqRepository = pyqRepository;
        this.appUserRepository = appUserRepository;
        this.userService = userService;
        this.courseRepository = courseRepository;
    }

    public Pyq uploadFileIn(MultipartFile file, Long courseId, Long userId) throws Exception {
        System.out.println("Service upload called");
        String fileNameDb = file.getOriginalFilename();
        if (pyqRepository.existsByFileName(fileNameDb)) {
            throw new DuplicateCourseException("pyq with the name '" + fileNameDb + "' already exists");
        }
        System.out.println("file name: "+file.getOriginalFilename());
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        fileObj.delete();

        Pyq createdPyq = new Pyq();


        Optional<Course> courseOptional = courseRepository.findById(courseId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);


        if(userOptional.isEmpty()){
            throw new Exception("User not found");
        }

        Course course = courseOptional.get();
        AppUser user = userOptional.get();




        createdPyq.setUploadedBy(user);
        createdPyq.setFileName(fileNameDb);
        createdPyq.setDbName(fileName);
        createdPyq.setCourse(course);
        createdPyq.setUploadDateTime(LocalDateTime.now());
        createdPyq.setDownloadUrl("http://localhost:8080/api/v1/notes/download/"+fileName);

        Pyq savedPyq = pyqRepository.save(createdPyq);

        course.getPyqs().add(savedPyq);

        return savedPyq;
    }

    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Pyq> findPyqsByCourseId(Long courseId) throws Exception{
        return pyqRepository.findByCourseId(courseId);
    }

    public String deleteFile(String fileName, Long userId, Long noteId) throws Exception {
        System.out.println("Called deleteFileMethod");
        s3Client.deleteObject(bucketName, fileName);
        System.out.println("Deleted from aws");
        Optional<Pyq> pyqOptional = pyqRepository.findById(noteId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(pyqOptional.isEmpty()){
            throw new Exception("pyq not found with id: "+noteId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id: "+userId);
        }


        Pyq pyq = pyqOptional.get();
        AppUser user = userOptional.get();
        System.out.println("Passed tests");
        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedExceptionAdmin("Only ADMIN can delete Pyqs...");
        }
        System.out.println("Deleted");
        pyqRepository.delete(pyq);
        return fileName + " removed ...";
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}
