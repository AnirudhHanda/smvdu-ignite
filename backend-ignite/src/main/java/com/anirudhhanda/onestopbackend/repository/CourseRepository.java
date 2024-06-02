package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    public List<Course> findByDepartmentId(Long departmentId);

    boolean existsByName(String name);

    List<Course> findByNameContainingIgnoreCase(String keyword);
    @Query("SELECT c.name, c.id FROM Course c LEFT JOIN c.department d WHERE d.id = :departmentId  AND LOWER(c.name) LIKE %:keyword%")
    List<String> findByDepartmentIdandKeyword(@Param("departmentId") Long departmentId, @Param("keyword") String keyword);

}
