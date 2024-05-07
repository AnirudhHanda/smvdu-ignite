package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.modal.Question;

import java.util.List;

public interface QuestionService {

    Question createQuestion(AppUser user, String question) throws Exception;

    void deleteQuestion(Long questionId, Long userId) throws Exception;

    List<Question> getAllQuestions() throws Exception;
}
