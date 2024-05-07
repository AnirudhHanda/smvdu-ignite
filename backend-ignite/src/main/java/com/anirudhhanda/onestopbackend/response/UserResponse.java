package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private boolean success;
    private AppUser user;
}
