package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.exceptions.AccessDeniedExceptionAdmin;
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
        System.out.println("Delete question method called");
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        Optional<AppUser> userOptional = appUserRepository.findById(userId);

        if(questionOptional.isEmpty()){
            throw new Exception("question not found with id: "+questionId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id: "+userId);
        }
        System.out.println("Crossed excpetions");
        Question question = questionOptional.get();
        AppUser user = userOptional.get();

        System.out.println("Question to be deleted: "+question);
        System.out.println("User found: "+user);
        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedExceptionAdmin("Only ADMIN can delete Questions...");
        }

        System.out.println("deleted successfully");
        questionRepository.delete(question);
    }

    @Override
    public List<Question> getAllQuestions() throws Exception {
        return questionRepository.findAllByOrderByCreatedDateTimeDesc();
    }
}
