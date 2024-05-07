package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionListResponse {
    private boolean success;
    private List<Question> questions;
}
