package com.anirudhhanda.onestopbackend.modal;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {
    @Id
    @SequenceGenerator(
            name = "department_sequence",
            sequenceName = "department_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "department_sequence"
    )
    private Long id;

    private String name;

    // TODO: first mention of chat entity was here at 1:51 so, may be required later

    // owner of this department
    @ManyToOne
    private AppUser owner;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses = new ArrayList<>();

}
