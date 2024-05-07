package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.dto.CourseDTO;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.request.CourseRequest;
import com.anirudhhanda.onestopbackend.response.CourseListResponse;
import com.anirudhhanda.onestopbackend.response.CourseResponse;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
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
}
