package com.anirudhhanda.onestopbackend.dto;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.modal.Department;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private boolean success;
    private Long id;

    private String name;

    private Long departmentId;

    private Department department;

    // exlude user while serialization
    private AppUser owner;

}
