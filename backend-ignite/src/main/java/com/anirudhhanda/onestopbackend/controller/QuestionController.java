package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.modal.Question;
import com.anirudhhanda.onestopbackend.request.QuestionRequest;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
import com.anirudhhanda.onestopbackend.response.QuestionListResponse;
import com.anirudhhanda.onestopbackend.response.QuestionResponse;
import com.anirudhhanda.onestopbackend.service.AccessLogService;
import com.anirudhhanda.onestopbackend.service.QuestionService;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@AllArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    private final UserService userService;

    private AccessLogService accessLogService;

    private AppUserRepository appUserRepository;

    @PostMapping("/upload")
    public ResponseEntity<QuestionResponse> createQuestion(
            @RequestBody QuestionRequest questionRequest,
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

        Question createdQuestion = questionService.createQuestion(user, questionRequest.getName());
        QuestionResponse res = new QuestionResponse();
        res.setSuccess(true);
        res.setQuestion(createdQuestion);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<MessageResponse> deleteQuestion(
            @PathVariable Long questionId,
            @RequestHeader("Authorization")  String token
    ) throws Exception {
        System.out.println("Delete controller question called");
        AppUser user = userService.findUserProfileByJwt(token);
        System.out.println("user for deletion found");
        questionService.deleteQuestion(questionId, user.getId());
        MessageResponse res = new MessageResponse();
        res.setMessage("Question deleted successfully");
        res.setSuccess(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<QuestionListResponse> getAllQuestions() throws Exception{
        List<Question> questions = questionService.getAllQuestions();
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        QuestionListResponse res = new QuestionListResponse();
        res.setSuccess(true);
        res.setQuestions(questions);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
