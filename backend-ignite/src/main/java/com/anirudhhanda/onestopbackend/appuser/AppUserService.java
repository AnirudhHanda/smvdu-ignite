package com.anirudhhanda.onestopbackend.appuser;

import com.anirudhhanda.onestopbackend.registration.LoginRequest;
import com.anirudhhanda.onestopbackend.registration.NameValidator;
import com.anirudhhanda.onestopbackend.registration.PasswordValidator;
import com.anirudhhanda.onestopbackend.registration.token.ConfirmationToken;
import com.anirudhhanda.onestopbackend.registration.token.ConfirmationTokenService;
import com.anirudhhanda.onestopbackend.response.AuthResponse;
import com.anirudhhanda.onestopbackend.security.config.JwtProvider;
import com.anirudhhanda.onestopbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private static final String USER_NOT_FOUND_MSG = "User with %s not found";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final PasswordValidator passwordValidator;
    private final NameValidator nameValidator;

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
            return appUserRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));

    }

    public AuthResponse signUpUser(AppUser appUser) throws Exception {
        // checking if the user exists
        Optional<AppUser> appUserOptional = appUserRepository.findByEmail(appUser.getEmail());
        boolean userExists = appUserOptional.isPresent();

        if (userExists) {
            throw new BadCredentialsException("email already taken");
        }

        boolean isValidFirstName = nameValidator.isValidName(appUser.getFirstName());
        boolean isValidLastName = nameValidator.isValidName(appUser.getLastName());

        if(!isValidFirstName || !isValidLastName){
            throw new BadCredentialsException("please enter a valid name");
        }
        boolean isValidPassword = passwordValidator.isValidPassword(appUser.getPassword());

        if(!isValidPassword){
            throw new BadCredentialsException("please set a strong password");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        // saving the user
        appUserRepository.save(appUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(appUser.getEmail(), appUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = JwtProvider.generateToken(authentication);

        System.out.println("Till that point");
//        AppUser user = userService.findUserProfileByJwt(jwt);
        AuthResponse res = new AuthResponse();
        res.setMessage("Sign up successful");
        res.setJwt(jwt);
        res.setUser(appUser);

        // TODO: Send confirmation token
        String token = UUID.randomUUID().toString();
        res.setEmailToken(token);

        System.out.println("email token created");
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        System.out.println("email token finally created");

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        // TODO: send the email
        return res;
    }
    public AuthResponse signUpAdmin(AppUser appUser) throws Exception {
        // checking if the user exists
        Optional<AppUser> appUserOptional = appUserRepository.findByEmail(appUser.getEmail());
        boolean userExists = appUserOptional.isPresent();

        if (userExists) {
            AuthResponse err = new AuthResponse();
            err.setMessage("email already taken");
            return err;
        }

        boolean isValidFirstName = nameValidator.isValidName(appUser.getFirstName());
        boolean isValidLastName = nameValidator.isValidName(appUser.getLastName());

        if(!isValidFirstName || !isValidLastName){
            throw new BadCredentialsException("please enter a valid name");
        }

        boolean isValidPassword = passwordValidator.isValidPassword(appUser.getPassword());

        if(!isValidPassword){
            throw new BadCredentialsException("please set a strong password");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        // saving the user
        appUserRepository.save(appUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(appUser.getEmail(), appUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = JwtProvider.generateToken(authentication);

//        AppUser user = userService.findUserProfileByJwt(jwt);
        AuthResponse res = new AuthResponse();
        res.setMessage("Sign up successful");
        res.setJwt(jwt);
        res.setUser(appUser);

        // TODO: Send confirmation token
        String token = UUID.randomUUID().toString();
        res.setEmailToken(token);

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        // TODO: send the email
        return res;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public AuthResponse loginUser(LoginRequest loginRequest) throws Exception{
        if (loginRequest == null || StringUtils.isEmpty(loginRequest.getEmail()) || StringUtils.isEmpty(loginRequest.getPassword())) {
            throw new IllegalArgumentException("Email and password cannot be empty");
        }

        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        UserDetails userDetails;
        try {
            userDetails = loadUserByUsername(username);
        } catch (UsernameNotFoundException ex) {
            throw new BadCredentialsException("User not found with email: " + username);
        }

        Authentication authentication = authenticateUser(username, password);
        boolean isEnabled = userDetails.isEnabled();
        if(!isEnabled) {
            throw new BadCredentialsException("User not enabled");
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = JwtProvider.generateToken(authentication);

        AppUser appUser = (AppUser) userDetails;
        AuthResponse res = new AuthResponse();
        res.setMessage("Login successful");
        res.setJwt(jwt);
        res.setUser(appUser);

        return res;
    }

    private Authentication authenticateUser(String username, String password) throws Exception{
        UserDetails userDetails = loadUserByUsername(username);
        System.out.println("authenticateUser method called");
        if(userDetails == null){
            System.out.println("Email not found excpetion thrown");
            throw new BadCredentialsException(username+" not registered");
        }
        if(!bCryptPasswordEncoder.matches(password, userDetails.getPassword())){
            System.out.println("bad password");
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }


}
