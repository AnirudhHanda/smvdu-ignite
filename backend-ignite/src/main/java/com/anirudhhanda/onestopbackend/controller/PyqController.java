package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.modal.Pyq;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
import com.anirudhhanda.onestopbackend.response.PyqListResponse;
import com.anirudhhanda.onestopbackend.response.PyqResponse;
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

    @PostMapping("/upload")
    public ResponseEntity<PyqResponse> uploadFile(
            @RequestParam(value = "courseId") Long courseId,
            @RequestParam(value="file") MultipartFile file,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(token);
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
