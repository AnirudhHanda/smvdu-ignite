package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateDepartmentException;
import com.anirudhhanda.onestopbackend.modal.Department;
import com.anirudhhanda.onestopbackend.repository.DepartmentRepository;
import com.anirudhhanda.onestopbackend.response.CResponse;
import com.anirudhhanda.onestopbackend.response.CResponseMaterial;
import com.anirudhhanda.onestopbackend.response.DResponse;
import com.anirudhhanda.onestopbackend.response.DResponseMaterial;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService{
    private final DepartmentRepository departmentRepository;

    private final AppUserRepository appUserRepository;

    private final UserService userService;

    @Override
    public Department createDepartment(Department department, AppUser user) throws Exception, DuplicateDepartmentException {
        if (departmentRepository.existsByName(department.getName())) {
            throw new DuplicateDepartmentException("Department with the name '" + department.getName() + "' already exists");
        }

        Department createdDepartment = new Department();

        createdDepartment.setName(department.getName());
        createdDepartment.setOwner(user);
        Department savedDepartment = departmentRepository.save(createdDepartment);

        return savedDepartment;
    }

    @Override
    public List<Department> getAllDepartments() throws Exception {
        return departmentRepository.findAllByOrderByNameAsc();// can also give findAllByOrderBy
    }

    @Override
    public Department getDepartmentById(Long deptId) throws Exception {
        Optional<Department> optionalDepartment = departmentRepository.findById(deptId);
        if (optionalDepartment.isEmpty()) {
            throw new Exception(String.format("Department with id %s not found", deptId));
        }
        return optionalDepartment.get();
    }

    @Override
    public Department updateDepartment(Department updatedDepartment, Long id) throws Exception {
        Department department =  getDepartmentById(id);

        department.setName(updatedDepartment.getName());
//        department.setSubjects(updatedDepartment.getSubjects());

        return departmentRepository.save(department);
    }

    @Override
    public void deleteDepartment(Long departmentId, Long userId) throws Exception {
        AppUser user = userService.findUserById(userId);
        // Check if the user has ADMIN role
        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedException("Only ADMIN users can delete departments.");
        }

        // Delete the department
        departmentRepository.deleteById(departmentId);
    }

    @Override
    public DResponse serachDepartments(String keyword) throws Exception {
        System.out.println("Serach function called");
        keyword = keyword.toLowerCase();
        List<String> departments = departmentRepository.findByNameContainingString(keyword);

        List<DResponseMaterial> dResMatList = new ArrayList<>();

        for (String department : departments) {
            System.out.println("String found: "+department);
            String[] parts = department.split(",");
            String departmentName = parts[0];
            Long id = Long.parseLong(parts[1]);

            System.out.println("Name: "+departmentName);
            System.out.println("ID: "+id);

            DResponseMaterial dResMat = new DResponseMaterial();
            dResMat.setName(departmentName);
            dResMat.setId(id);

            dResMatList.add(dResMat);
        }

        DResponse dRes = new DResponse();
        dRes.setSuccess(true);
        dRes.setCourses(dResMatList);

        System.out.println("Departments found: "+departments);
        return dRes;
    }
}
