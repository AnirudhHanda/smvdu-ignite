package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Department;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentResponse {
    private boolean success;
    private Department department;
}
