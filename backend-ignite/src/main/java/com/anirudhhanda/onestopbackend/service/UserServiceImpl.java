package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.appuser.AppUser;
import com.anirudhhanda.onestopbackend.appuser.AppUserRepository;
import com.anirudhhanda.onestopbackend.security.config.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final AppUserRepository appUserRepository;

    @Override
    public AppUser findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtProvider.getemailFromToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public AppUser findUserByEmail(String email) throws Exception {
        Optional<AppUser> user = appUserRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new Exception("email not found by email");
        }

        return user.get();
    }

    @Override
    public AppUser findUserById(Long userId) throws Exception {
        Optional<AppUser> user = appUserRepository.findById(userId);
        if(user.isEmpty()){
            throw new Exception("user not found by id");
        }
        return user.get();
    }
}
