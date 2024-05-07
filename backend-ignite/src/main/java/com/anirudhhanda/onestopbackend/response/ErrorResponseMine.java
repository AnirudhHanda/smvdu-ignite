package com.anirudhhanda.onestopbackend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ProblemDetail;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseMine {
    private boolean success;
    private ProblemDetail errorDetail;
}
