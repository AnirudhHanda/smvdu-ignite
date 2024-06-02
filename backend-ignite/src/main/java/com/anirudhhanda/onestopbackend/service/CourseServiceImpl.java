package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRole;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateCourseException;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateDepartmentException;
import com.anirudhhanda.onestopbackend.modal.Course;
import com.anirudhhanda.onestopbackend.modal.Department;
import com.anirudhhanda.onestopbackend.repository.CourseRepository;
import com.anirudhhanda.onestopbackend.request.CourseRequest;
import com.anirudhhanda.onestopbackend.response.CResponse;
import com.anirudhhanda.onestopbackend.response.CResponseMaterial;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Override
    public CResponse serachCourses(String keyword, Long departmentId) throws Exception {
        System.out.println("Search method called ----Keyword: " + keyword + " -----DeptId: " + departmentId);
        keyword = keyword.toLowerCase();
        List<String> courses = courseRepository.findByDepartmentIdandKeyword(departmentId, keyword);

        List<CResponseMaterial> cResMatList = new ArrayList<>();


        for (String course : courses) {
            System.out.println("String found: "+course);
            String[] parts = course.split(",");
            String courseName = parts[0];
            Long id = Long.parseLong(parts[1]);

            System.out.println("Name: "+courseName);
            System.out.println("ID: "+id);

            CResponseMaterial cResMat = new CResponseMaterial();
            cResMat.setName(courseName);
            cResMat.setId(id);

            cResMatList.add(cResMat);
        }

        CResponse cRes = new CResponse();
        cRes.setSuccess(true);
        cRes.setCourses(cResMatList);

        System.out.println("Courses found: " + cResMatList);
        return cRes;
    }
}
