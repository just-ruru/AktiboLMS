package com.aktibolms.controller;

import com.aktibolms.dto.auth.AuthResponse;
import com.aktibolms.dto.auth.LoginRequest;
import com.aktibolms.dto.auth.RegisterRequest;
import com.aktibolms.dto.auth.TokenRefreshRequest;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
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
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        AuthResponse response = authService.refresh(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AuthResponse.UserDTO> getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.debug("getCurrentUser called with authentication: {}", authentication);
        if (authentication == null || authentication.getPrincipal() == null) {
            log.error("No authentication found in SecurityContext");
            throw new IllegalArgumentException("Not authenticated");
        }
        if (!(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            log.error("Principal is not CustomUserDetails: {}", authentication.getPrincipal().getClass());
            throw new IllegalArgumentException("Invalid authentication principal");
        }
        AuthResponse.UserDTO user = authService.getCurrentUser(userDetails.getId());
        return ResponseEntity.ok(user);
    }
}
