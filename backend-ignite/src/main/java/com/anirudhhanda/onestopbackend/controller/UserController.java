package com.anirudhhanda.onestopbackend.controller;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.response.UserResponse;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getUserProfile(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        AppUser user = userService.findUserProfileByJwt(token);
        UserResponse res = new UserResponse();
        res.setSuccess(true);
        res.setUser(user);
        return ResponseEntity.ok(res);
    }
}
