package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.modal.Department;
import com.anirudhhanda.onestopbackend.response.*;
import com.anirudhhanda.onestopbackend.service.AccessLogService;
import com.anirudhhanda.onestopbackend.service.DepartmentService;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/departments")
@AllArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    private final UserService userService;

    private AccessLogService accessLogService;

    private AppUserRepository appUserRepository;

    @GetMapping
    public ResponseEntity<DepartmentListResponse> getAllDepartments(
//            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        List<Department> departments = departmentService.getAllDepartments();
        // message to be displayed if no department available
        if (departments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        DepartmentListResponse res = new DepartmentListResponse();
        res.setSuccess(true);
        res.setDepartments(departments);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(
            @PathVariable Long departmentId
//            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Department department = departmentService.getDepartmentById(departmentId);

        DepartmentResponse res = new DepartmentResponse();
        res.setSuccess(true);
        res.setDepartment(department);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<DepartmentResponse> createDepartment(
            @RequestBody Department department,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(jwt);
        // Log the access attempt
        accessLogService.logAccess(user);
        appUserRepository.save(user);

        // Check the number of accesses in the last 24 hours
        int accessCount = accessLogService.countRecentAccesses(user, 24);

        if (accessCount > 8) {
            // Handle the case where the user has accessed too many times
            throw new ExceedException("Exceeded upload limit, can only upload 6 items per day...");
        }
        Department createdDepartment = departmentService.createDepartment(department, user);

        DepartmentResponse res = new DepartmentResponse();
        res.setSuccess(true);
        res.setDepartment(createdDepartment);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PatchMapping("/{departmentId}")
    public ResponseEntity<DepartmentResponse> updateDepartment(
            @PathVariable Long departmentId,
            @RequestBody Department updatedDepartment
    ) throws Exception {
        Department newUpdatedDepartment = departmentService.updateDepartment(updatedDepartment, departmentId);
        DepartmentResponse res = new DepartmentResponse();
        res.setSuccess(true);
        res.setDepartment(newUpdatedDepartment);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @DeleteMapping("/{departmentId}")
    public ResponseEntity<MessageResponse> deleteDepartment(
            @PathVariable Long departmentId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(jwt);
        Long userId = user.getId();
        departmentService.deleteDepartment(departmentId, userId);

        MessageResponse res = new MessageResponse();
        res.setMessage("Department deleted successfully");
        res.setSuccess(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<DResponse> searchDepartments(
            @RequestParam(required = false) String keyword
//            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        System.out.println("search controller called");
        DResponse departments = departmentService.serachDepartments(keyword);
        // message to be displayed if no department available
//        if (departments.size() == 0) {
//            return ResponseEntity.noContent().build();
//        }

//        DepartmentListResponse res = new DepartmentListResponse();
//        res.setSuccess(true);
//        res.setDepartments(departments);

        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    // ig controller completed

}
