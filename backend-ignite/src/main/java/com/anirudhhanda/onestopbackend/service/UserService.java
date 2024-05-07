package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;

public interface UserService {
    AppUser findUserProfileByJwt(String jwt) throws Exception;

    AppUser findUserByEmail(String email) throws Exception;

    AppUser findUserById(Long userId) throws Exception;

}
