package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private boolean success;
    private Course course;
}
