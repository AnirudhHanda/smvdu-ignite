package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DResponseMaterial {
    private String name;
    private Long id;
}
