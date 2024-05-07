package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Pyq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PyqRepository extends JpaRepository<Pyq, Long> {
    public List<Pyq> findByCourseId(Long courseId);
    boolean existsByFileName(String name);
}
