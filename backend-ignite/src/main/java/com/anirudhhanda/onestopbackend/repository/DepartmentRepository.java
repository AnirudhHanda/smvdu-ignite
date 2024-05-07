package com.anirudhhanda.onestopbackend.repository;

import com.anirudhhanda.onestopbackend.modal.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    List<Department> findAllByOrderByNameAsc();

    // might not be used
    List<Department> findAllById(Long id);

    // to implement search functionality
    List<Department> findByNameContaining(String name);


    boolean existsByName(String name);
}
