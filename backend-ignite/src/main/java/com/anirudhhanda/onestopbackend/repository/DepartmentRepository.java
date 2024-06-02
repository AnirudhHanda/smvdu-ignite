package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    List<Department> findAllByOrderByNameAsc();

    // might not be used
    List<Department> findAllById(Long id);

    boolean existsByName(String name);

    // to implement search functionality
    List<Department> findByNameContaining(String name);

    @Query("SELECT d.name,d.id FROM Department d WHERE LOWER(d.name) LIKE %:keyword%")
    List<String> findByNameContainingString(@Param("keyword") String keyword);
}
