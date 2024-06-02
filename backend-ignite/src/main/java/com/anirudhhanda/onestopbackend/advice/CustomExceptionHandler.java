package com.anirudhhanda.onestopbackend.advice;

import com.anirudhhanda.onestopbackend.exceptions.AccessDeniedExceptionAdmin;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateCourseException;
import com.anirudhhanda.onestopbackend.exceptions.DuplicateDepartmentException;
import com.anirudhhanda.onestopbackend.exceptions.ExceedException;
import com.anirudhhanda.onestopbackend.response.ErrorResponseMine;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseMine> handleSecurityException(Exception ex){
        ProblemDetail errorDetail = null;
        if(ex instanceof BadCredentialsException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "Bad Credentials");
        }

        if(ex instanceof AccessDeniedException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "not_authorized");
        }

        if(ex instanceof IllegalArgumentException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "invalid_arguements");
        }

        if(ex instanceof IllegalStateException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "state_not_found");
        }

        if(ex instanceof SignatureException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "invalid token");
        }

        if(ex instanceof ExpiredJwtException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "jwt token expired");
        }

        if(ex instanceof DuplicateDepartmentException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "duplicate department");
        }

        if(ex instanceof DuplicateCourseException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("access_denied_reason", "duplicate course");
        }

        if(ex instanceof ExceedException){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("reason", "exceeded upload limit");
        }

        if(ex instanceof AccessDeniedExceptionAdmin){
            errorDetail = ProblemDetail
                    .forStatusAndDetail(HttpStatusCode.valueOf(400), ex.getMessage());
            errorDetail.setProperty("reason", "not an Admin");
        }

        ErrorResponseMine errRes = new ErrorResponseMine();
        errRes.setErrorDetail(errorDetail);
        errRes.setSuccess(false);

        return new ResponseEntity<>(errRes, HttpStatus.BAD_REQUEST);
    }
}
