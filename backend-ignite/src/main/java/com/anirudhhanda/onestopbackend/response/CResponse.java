package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CResponse {
    private boolean susccess;
    private List<CResponseMaterial> courses;

    public void setSuccess(boolean b) {
        this.susccess = b;
    }
    public void setCourses(List<CResponseMaterial> courses){
        this.courses = courses;
    }
}
