package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByOrderByCreatedDateTimeDesc();
}
