package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.request.CourseRequest;
import com.anirudhhanda.onestopbackend.response.MessageResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {

    Course getCourseById(Long id) throws Exception;

    List<Course> getCoursesByDepartmentId(Long departmentId) throws Exception;

    Course createCourse(CourseRequest course, AppUser user) throws Exception;

    void deleteCourse(Long subId, Long userId) throws Exception;


}
