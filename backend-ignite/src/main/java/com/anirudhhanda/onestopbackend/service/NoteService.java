package com.anirudhhanda.onestopbackend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.exceptions.AccessDeniedExceptionAdmin;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateCourseException;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.modal.Note;
import com.anirudhhanda.onestopbackend.repository.CourseRepository;
import com.anirudhhanda.onestopbackend.repository.NoteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing notes.
 */
@Service
@Slf4j
public class NoteService {
    @Autowired
    private final NoteRepository noteRepository;
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

    /**
     * Constructor for NoteService.
     *
     * @param noteRepository     Repository for Note entities.
     * @param appUserRepository  Repository for AppUser entities.
     * @param userService        Service for managing users.
     * @param courseRepository   Repository for Course entities.
     */
    public NoteService(NoteRepository noteRepository, AppUserRepository appUserRepository, UserService userService, CourseRepository courseRepository) {
        this.noteRepository = noteRepository;
        this.appUserRepository = appUserRepository;
        this.userService = userService;
        this.courseRepository = courseRepository;
    }

    /**
     * Uploads a file as a note for a specific course.
     *
     * @param file     MultipartFile representing the uploaded file.
     * @param courseId ID of the course to which the note belongs.
     * @param userId   ID of the user uploading the note.
     * @return The uploaded note.
     * @throws Exception If an error occurs during the upload process.
     */
    public Note uploadFileIn(MultipartFile file, Long courseId, Long userId) throws Exception {
        System.out.println("Service upload called");
        String fileNameDb = file.getOriginalFilename();
        if (noteRepository.existsByFileName(fileNameDb)) {
            throw new DuplicateCourseException("Note with the name '" + fileNameDb + "' already exists");
        }
        System.out.println("file name: "+file.getOriginalFilename());
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        fileObj.delete();

        Note createdNote = new Note();

        Optional<Course> courseOptional = courseRepository.findById(courseId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(userOptional.isEmpty()){
            throw new Exception("User not found");
        }

        Course course = courseOptional.get();
        AppUser user = userOptional.get();

        createdNote.setUploadedBy(user);
        createdNote.setFileName(fileNameDb);
        createdNote.setDbName(fileName);
        createdNote.setCourse(course);
        createdNote.setUploadDateTime(LocalDateTime.now());
        createdNote.setDownloadUrl("http://localhost:8080/api/v1/notes/download/"+fileName);

        Note savedNote = noteRepository.save(createdNote);

        course.getNotes().add(savedNote);

        return savedNote;
    }

    /**
     * Downloads a file from the storage.
     *
     * @param fileName Name of the file to download.
     * @return Byte array representing the downloaded file.
     */
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

    /**
     * Finds all notes associated with a specific course.
     *
     * @param courseId ID of the course.
     * @return List of notes associated with the course.
     * @throws Exception If an error occurs during the retrieval process.
     */
    public List<Note> findNotesByCourseId(Long courseId) throws Exception{
        return noteRepository.findByCourseId(courseId);
    }

    /**
     * Deletes a file from the storage.
     *
     * @param fileName Name of the file to delete.
     * @param userId   ID of the user initiating the deletion.
     * @param noteId   ID of the note to delete.
     * @return Confirmation message.
     * @throws Exception If an error occurs during the deletion process.
     */
    public String deleteFile(String fileName, Long userId, Long noteId) throws Exception {
        s3Client.deleteObject(bucketName, fileName);

        Optional<Note> noteOptional = noteRepository.findById(noteId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(noteOptional.isEmpty()){
            throw new AccessDeniedException("note not found with id: "+noteId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id: "+userId);
        }

        Note note = noteOptional.get();
        AppUser user = userOptional.get();

        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedExceptionAdmin("Only ADMIN can delete Notes...");
        }

        noteRepository.delete(note);
        return fileName + " removed ...";
    }


    /**
     * Converts a MultipartFile to a File.
     *
     * @param file MultipartFile to convert.
     * @return Converted File object.
     */
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
