package com.anirudhhanda.onestopbackend.registration;

import com.anirudhhanda.onestopbackend.response.AuthResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/registration")
    public ResponseEntity<AuthResponse> register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }

    @PostMapping("/registration/admin")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody RegistrationRequest request){
        return registrationService.registerAdmin(request);
    }



    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        System.out.println("confirm called then\n");
        return registrationService.confirmToken(token);
    }

    @PostMapping("/loging")
    public ResponseEntity<AuthResponse> loging(@RequestBody LoginRequest loginRequest) throws Exception {
        return registrationService.login(loginRequest);
    }

}
