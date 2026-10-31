package com.aktibolms.controller;

import com.aktibolms.dto.auth.AuthResponse;
import com.aktibolms.dto.auth.LoginRequest;
import com.aktibolms.dto.auth.RegisterRequest;
import com.aktibolms.dto.auth.TokenRefreshRequest;
import com.aktibolms.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody TokenRefreshRequest request) {
        AuthResponse response = authService.refresh(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AuthResponse.UserDTO> getCurrentUser(
            @RequestAttribute("userId") java.util.UUID userId) {
        AuthResponse.UserDTO user = authService.getCurrentUser(userId);
        return ResponseEntity.ok(user);
    }
}
