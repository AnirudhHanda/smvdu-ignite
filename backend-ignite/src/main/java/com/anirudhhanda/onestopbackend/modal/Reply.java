package com.anirudhhanda.onestopbackend.modal;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Reply {
    @Id
    @SequenceGenerator(
            name = "reply_sequence",
            sequenceName = "reply_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "reply_sequence"
    )
    private Long id;
    private String name;
//    private Long quesId;

    @ManyToOne
    private AppUser owner;

    @JsonIgnore
    @ManyToOne
    private Question question;

    private LocalDateTime createdDateTime;

}
