package com.anirudhhanda.onestopbackend.registration;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
