package com.anirudhhanda.onestopbackend.modal;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fileName;
    private String downloadUrl;
    private LocalDateTime uploadDateTime;

    @ManyToOne
    private AppUser uploadedBy;

    @JsonIgnore
    @ManyToOne
    private Course course;
}
