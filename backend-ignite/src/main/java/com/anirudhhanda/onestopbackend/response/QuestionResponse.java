package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private boolean success;
    private Question question;
}
