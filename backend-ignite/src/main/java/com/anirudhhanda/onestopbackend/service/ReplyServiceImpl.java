package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.exceptions.AccessDeniedExceptionAdmin;
import com.anirudhhanda.onestopbackend.modal.Question;
import com.anirudhhanda.onestopbackend.modal.Reply;
import com.anirudhhanda.onestopbackend.repository.QuestionRepository;
import com.anirudhhanda.onestopbackend.repository.ReplyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final UserService userService;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final AppUserRepository appUserRepository;

    @Override
    public Reply createReply(Long questionId, Long userId, String name) throws Exception {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(userOptional.isEmpty()){
            throw new Exception("User not found");
        }

//        if(questionOptional.isEmpty()){
//            throw new Exception("Question not found");
//        }

        Question question = questionOptional.get();
        AppUser user = userOptional.get();

        Reply reply = new Reply();
        reply.setQuestion(question);
        reply.setOwner(user);
        reply.setName(name);
        reply.setCreatedDateTime(LocalDateTime.now());

        Reply savedReply = replyRepository.save(reply);

        question.getReplies().add(savedReply);

        return savedReply;
    }

    @Override
    public void deleteReply(Long replyId, Long userId) throws Exception {
        Optional<Reply> replyOptional = replyRepository.findById(replyId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(replyOptional.isEmpty()){
            throw new Exception("reply not found with id: "+replyId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id: "+userId);
        }

        Reply reply = replyOptional.get();
        AppUser user = userOptional.get();

        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedExceptionAdmin("Only ADMIN can delete replies...");
        }

        replyRepository.delete(reply);
    }

    @Override
    public List<Reply> findRepliesByQuestionId(Long questionId) throws Exception {
        return replyRepository.findByQuestionId(questionId);
    }
}
