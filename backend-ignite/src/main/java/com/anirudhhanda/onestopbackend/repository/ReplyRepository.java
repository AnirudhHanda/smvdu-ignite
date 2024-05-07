package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    
    public List<Reply> findByQuestionId(Long questionId);
}
