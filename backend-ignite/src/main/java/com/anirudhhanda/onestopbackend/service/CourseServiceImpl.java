package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateCourseException;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateDepartmentException;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.modal.Department;
import com.anirudhhanda.onestopbackend.repository.CourseRepository;
import com.anirudhhanda.onestopbackend.request.CourseRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    private final DepartmentService departmentService;

    private final UserService userService;

    @Override
    public Course getCourseById(Long id) throws Exception {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return course.get();
        }
        throw new Exception("Course not found");
    }

    @Override
    public List<Course> getCoursesByDepartmentId(Long departmentId) throws Exception {
        return courseRepository.findByDepartmentId(departmentId);
    }

    @Override
    public Course createCourse(CourseRequest courseRequest, AppUser user) throws Exception {
        Department department = departmentService.getDepartmentById(courseRequest.getDeptId());

        if (courseRepository.existsByName(courseRequest.getName())) {
            throw new DuplicateCourseException("Course with the name '" + courseRequest.getName() + "' already exists");
        }

        Course course = new Course();
        course.setDepartment(department);
        course.setName(courseRequest.getName());
//        course.setDeptId(courseRequest.getDeptId());
        course.setOwner(user);

        department.getCourses().add(course);

        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long subId, Long userId) throws Exception {
        AppUser user = userService.findUserById(userId);

        if (!user.getAppUserRole().equals(AppUserRole.ADMIN)) {
            throw new AccessDeniedException("Only ADMIN users can delete Courses.");
        }

        courseRepository.deleteById(subId);
    }
}
