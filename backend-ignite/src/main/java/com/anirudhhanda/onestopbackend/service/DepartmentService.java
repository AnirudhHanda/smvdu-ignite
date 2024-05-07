package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateDepartmentException;
import com.anirudhhanda.onestopbackend.modal.Department;

import java.util.List;

public interface DepartmentService {

    Department createDepartment(Department department, AppUser user) throws Exception, DuplicateDepartmentException;

    List<Department> getAllDepartments() throws Exception;

    Department getDepartmentById(Long deptId) throws Exception;

    Department updateDepartment(Department updatedDepartment, Long id) throws Exception;

    void deleteDepartment(Long departmentId, Long userid) throws Exception;

    List<Department> serachDepartments(String keyword) throws Exception;
}
