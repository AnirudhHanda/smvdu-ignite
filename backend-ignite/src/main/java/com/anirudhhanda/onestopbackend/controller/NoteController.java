package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.modal.Note;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
import com.anirudhhanda.onestopbackend.response.NoteListResponse;
import com.anirudhhanda.onestopbackend.response.NoteResponse;
import com.anirudhhanda.onestopbackend.service.AccessLogService;
import com.anirudhhanda.onestopbackend.service.NoteService;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
@AllArgsConstructor
public class NoteController {
    private NoteService noteService;
    private final UserService userService;
    private AccessLogService accessLogService;

    private AppUserRepository appUserRepository;

    @PostMapping("/upload")
    public ResponseEntity<NoteResponse> uploadFile(
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
        Note createdNote = noteService.uploadFileIn(file, courseId, user.getId());
        NoteResponse noteResponse = new NoteResponse();
        noteResponse.setNote(createdNote);
        noteResponse.setSuccess(true);
        return new ResponseEntity<>(noteResponse, HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(
            @PathVariable String fileName
    ) {
        byte[] data = noteService.downloadFile(fileName);
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
            @RequestParam(value = "noteId") Long noteId,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(token);

        String str = noteService.deleteFile(fileName, user.getId(), noteId);
        MessageResponse res = new MessageResponse();
        res.setSuccess(true);
        res.setMessage("note file deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<NoteListResponse> getNotesByCourseId(
            @PathVariable Long courseId
    ) throws Exception {
        List<Note> notes = noteService.findNotesByCourseId(courseId);
        NoteListResponse res = new NoteListResponse();
        res.setNotes(notes);
        res.setSuccess(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
