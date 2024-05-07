package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    public List<Course> findByDepartmentId(Long departmentId);

    boolean existsByName(String name);
}
