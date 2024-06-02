package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.dto.CourseDTO;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.request.CourseRequest;
import com.anirudhhanda.onestopbackend.response.*;
import com.anirudhhanda.onestopbackend.service.AccessLogService;
import com.anirudhhanda.onestopbackend.service.CourseService;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@AllArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final UserService userService;

    private AccessLogService accessLogService;

    private AppUserRepository appUserRepository;
    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable Long courseId) throws Exception {
        Course course = courseService.getCourseById(courseId);
        CourseResponse res = new CourseResponse();
        res.setCourse(course);
        res.setSuccess(true);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<CourseListResponse> getCourseByDepartment(
            @PathVariable Long departmentId
    ) throws Exception {
        List<Course> courses = courseService.getCoursesByDepartmentId(departmentId);
        CourseListResponse res = new CourseListResponse();
        res.setCourses(courses);
        res.setSusccess(true);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/upload")
    public ResponseEntity<CourseDTO> createCourse(
            @RequestBody CourseRequest course,
            @RequestHeader("Authorization") String token
            ) throws Exception {

        AppUser tokenUser = userService.findUserProfileByJwt(token);
        AppUser user = userService.findUserById(tokenUser.getId());

        // Log the access attempt
        accessLogService.logAccess(user);
        appUserRepository.save(user);

        // Check the number of accesses in the last 24 hours
        int accessCount = accessLogService.countRecentAccesses(user, 24);

        if (accessCount > 8) {
            // Handle the case where the user has accessed too many times
            throw new ExceedException("Exceeded upload limit, can only upload 6 items per day...");
        }

        if(user != null){
            Course createdCourse = courseService.createCourse(course, user);
            CourseDTO courseDTO = new CourseDTO();
            courseDTO.setSuccess(true);
            courseDTO.setId(createdCourse.getId());
            courseDTO.setName(createdCourse.getName());
            courseDTO.setDepartment(createdCourse.getDepartment());
            courseDTO.setOwner(createdCourse.getOwner());
//            courseDTO.setDepartmentId(createdCourse.getDeptId());
//            courseDTO.setDepartmentId(createdCourse.set);
            return ResponseEntity.ok(courseDTO);
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<MessageResponse> deleteCourse(
            @PathVariable Long courseId,
            @RequestHeader("Authorization") String token
            ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(token);

        courseService.deleteCourse(courseId, user.getId());

        MessageResponse res = new MessageResponse();
        res.setMessage("Deleted course successfully");
        res.setSuccess(true);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/search")
    public ResponseEntity<CResponse> searchCourses(
            @RequestParam Long departmentId,
            @RequestParam String keyword
//            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        System.out.println("Search Controller called: ");
        CResponse courses = courseService.serachCourses(keyword, departmentId);
//        // message to be displayed if no department available
//        if (courses.size() == 0) {
//            return ResponseEntity.noContent().build();
//        }

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}
