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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccessLogService {
    public void logAccess(AppUser user) {
        LocalDateTime now = LocalDateTime.now();
        user.addAccessTimestamp(now);
    }

    public int countRecentAccesses(AppUser user, int hours) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime threshold = now.minusHours(hours);
        List<LocalDateTime> timestamps = user.getAccessTimestamps();

        return (int) timestamps.stream()
                .filter(timestamp -> timestamp.isAfter(threshold))
                .count();
    }
}
