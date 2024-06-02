package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.modal.Pyq;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
import com.anirudhhanda.onestopbackend.response.PyqListResponse;
import com.anirudhhanda.onestopbackend.response.PyqResponse;
import com.anirudhhanda.onestopbackend.service.AccessLogService;
import com.anirudhhanda.onestopbackend.service.PyqService;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pyqs")
@AllArgsConstructor
public class PyqController {
    private PyqService pyqService;
    private final UserService userService;
    private AccessLogService accessLogService;

    private AppUserRepository appUserRepository;

    @PostMapping("/upload")
    public ResponseEntity<PyqResponse> uploadFile(
            @RequestParam(value = "courseId") Long courseId,
            @RequestParam(value="file") MultipartFile file,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(token);
        // Log the access attempt
        accessLogService.logAccess(user);
        appUserRepository.save(user);

        // Check the number of accesses in the last 24 hours
        int accessCount = accessLogService.countRecentAccesses(user, 24);

        if (accessCount > 8) {
            // Handle the case where the user has accessed too many times
            throw new ExceedException("Exceeded upload limit, can only upload 6 items per day...");
        }
        Pyq createdPyq = pyqService.uploadFileIn(file, courseId, user.getId());
        PyqResponse res = new PyqResponse();
        res.setSuccess(true);
        res.setPyq(createdPyq);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(
            @PathVariable String fileName
    ) {
        byte[] data = pyqService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<MessageResponse> deleteFile(
            @PathVariable String fileName,
            @RequestParam(value = "pyqId") Long pyqId,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        System.out.println("Called pyq delete controller");
        AppUser user = userService.findUserProfileByJwt(token);
        String str = pyqService.deleteFile(fileName, user.getId(), pyqId);
        MessageResponse res = new MessageResponse();
        res.setSuccess(true);
        res.setMessage("pyq file deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<PyqListResponse> getPyqsByCourseId(
            @PathVariable Long courseId
    ) throws Exception {
        List<Pyq> pyqs = pyqService.findPyqsByCourseId(courseId);
        PyqListResponse res = new PyqListResponse();
        res.setSuccess(true);
        res.setPyqs(pyqs);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
