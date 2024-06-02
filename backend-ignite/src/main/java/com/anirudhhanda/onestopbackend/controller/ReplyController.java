package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserService;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.modal.Reply;
import com.anirudhhanda.onestopbackend.request.ReplyRequest;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
import com.anirudhhanda.onestopbackend.response.ReplyListResponse;
import com.anirudhhanda.onestopbackend.response.ReplyResponse;
import com.anirudhhanda.onestopbackend.service.AccessLogService;
import com.anirudhhanda.onestopbackend.service.ReplyService;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/replies")
@AllArgsConstructor
public class ReplyController {

    private final ReplyService replyService;
    private final UserService userService;

    private AccessLogService accessLogService;

    private AppUserRepository appUserRepository;


    @PostMapping("/upload")
    public ResponseEntity<ReplyResponse> createReply(
            @RequestBody ReplyRequest replyRequest,
            @RequestHeader("Authorization") String token
    ) throws Exception{
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

        Reply createdReply = replyService.createReply(replyRequest.getQuestionId(), user.getId(), replyRequest.getName());
        ReplyResponse res = new ReplyResponse();
        res.setSuccess(true);
        res.setReply(createdReply);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity<MessageResponse> deleteReply(
            @PathVariable Long replyId,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(token);
        replyService.deleteReply(replyId, user.getId());
        MessageResponse res = new MessageResponse();
        res.setMessage("Successfully deleted reply");
        res.setSuccess(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<ReplyListResponse> getRepliesByQuestionId(
            @PathVariable Long questionId
    ) throws Exception {
        List<Reply> replies = replyService.findRepliesByQuestionId(questionId);
        ReplyListResponse res = new ReplyListResponse();
        res.setSuccess(true);
        res.setReplies(replies);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
