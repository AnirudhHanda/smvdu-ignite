package com.anirudhhanda.onestopbackend.registrationtest;

import com.anirudhhanda.onestopbackend.registration.LoginRequest;
import com.anirudhhanda.onestopbackend.registration.RegistrationController;
import com.anirudhhanda.onestopbackend.registration.RegistrationRequest;
import com.anirudhhanda.onestopbackend.registration.RegistrationService;
import com.anirudhhanda.onestopbackend.response.AuthResponse;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RegistrationControllerTest {

    @Mock
    private RegistrationService registrationService;

    @InjectMocks
    private RegistrationController registrationController;

    @Test
    public void testRegister() {
        // Setup
        RegistrationRequest request = new RegistrationRequest("Anirudh", "Handa", "Anirudh@4321", "21bcs014@smvdu.ac.in");
        AuthResponse expectedResponse = new AuthResponse();
        when(registrationService.register(request)).thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.CREATED));

        // Execution
        ResponseEntity<AuthResponse> actualResponse = registrationController.register(request);

        // Verification
        assertEquals(expectedResponse, actualResponse.getBody());
        assertEquals(HttpStatus.CREATED, actualResponse.getStatusCode());
        verify(registrationService, times(1)).register(request);
    }

    @Test
    public void testRegisterAdmin() {
        // Setup
        RegistrationRequest request = new RegistrationRequest("Aditi", "Handa", "Anirudh@4321", "ghuriahanda123@gmail.com");
        AuthResponse expectedResponse = new AuthResponse();
        when(registrationService.registerAdmin(request)).thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.CREATED));

        // Execution
        ResponseEntity<AuthResponse> actualResponse = registrationController.registerAdmin(request);

        // Verification
        assertEquals(expectedResponse, actualResponse.getBody());
        assertEquals(HttpStatus.CREATED, actualResponse.getStatusCode());
        verify(registrationService, times(1)).registerAdmin(request);
    }

    @Test
    public void testConfirm() {
        // Setup
        String token = "example-token";
        String expectedResponse = "confirmed";
        when(registrationService.confirmToken(token)).thenReturn(expectedResponse);

        // Execution
        String actualResponse = registrationController.confirm(token);

        // Verification
        assertEquals(expectedResponse, actualResponse);
        verify(registrationService, times(1)).confirmToken(token);
    }

    @Test
    public void testLoging() throws Exception {
        // Setup
        LoginRequest loginRequest = new LoginRequest();
        AuthResponse expectedResponse = new AuthResponse();
        when(registrationService.login(loginRequest)).thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.CREATED));

        // Execution
        ResponseEntity<AuthResponse> actualResponse = registrationController.loging(loginRequest);

        // Verification
        assertEquals(expectedResponse, actualResponse.getBody());
        assertEquals(HttpStatus.CREATED, actualResponse.getStatusCode());
        verify(registrationService, times(1)).login(loginRequest);
    }
}

