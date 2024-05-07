package com.anirudhhanda.onestopbackend.modal;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Course {
    @Id
    @SequenceGenerator(
            name = "course_sequence",
            sequenceName = "course_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "course_sequence"
    )
    private Long id;
    private String name;
//    private Long deptId;

    @ManyToOne
    private AppUser owner;

    @JsonIgnore
    @ManyToOne
    private Department department;

//    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes = new ArrayList<>();
//
//    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pyq> pyqs = new ArrayList<>();



}
