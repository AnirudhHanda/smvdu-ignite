package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private boolean success;
    private String jwt;
    private String message;
    private String emailToken;
    private AppUser user;
}
