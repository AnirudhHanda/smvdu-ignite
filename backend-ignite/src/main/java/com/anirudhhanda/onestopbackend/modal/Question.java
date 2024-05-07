package com.anirudhhanda.onestopbackend.modal;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    @Id
    @SequenceGenerator(
            name = "question_sequence",
            sequenceName = "question_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "question_sequence"
    )
    private Long id;
    private String name;

//    @JsonIgnore
    @ManyToOne
    private AppUser owner;

    private LocalDateTime createdDateTime;

//    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();



}
