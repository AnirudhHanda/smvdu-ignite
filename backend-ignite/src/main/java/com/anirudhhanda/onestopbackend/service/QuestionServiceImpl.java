package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.modal.Question;
import com.anirudhhanda.onestopbackend.modal.Reply;
import com.anirudhhanda.onestopbackend.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final AppUserRepository appUserRepository;
    private final UserService userService;
    @Override
    public Question createQuestion(AppUser user, String name) throws Exception {
        Question createdQuestion = new Question();


        createdQuestion.setCreatedDateTime(LocalDateTime.now());
        createdQuestion.setName(name);
        createdQuestion.setOwner(user);

        Question savedQuestion = questionRepository.save(createdQuestion);
        return savedQuestion;
    }

    @Override
    public void deleteQuestion(Long questionId, Long userId) throws Exception {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(questionOptional.isEmpty()){
            throw new Exception("question not found with id: "+questionId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id: "+userId);
        }

        Question question = questionOptional.get();
        AppUser user = userOptional.get();

        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedException("Only ADMIN users can delete departments.");
        }

        questionRepository.delete(question);
    }

    @Override
    public List<Question> getAllQuestions() throws Exception {
        return questionRepository.findAllByOrderByCreatedDateTimeDesc();
    }
}
