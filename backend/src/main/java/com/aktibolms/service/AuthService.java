package com.aktibolms.service;

import com.aktibolms.dto.auth.AuthResponse;
import com.aktibolms.dto.auth.LoginRequest;
import com.aktibolms.dto.auth.RegisterRequest;
import com.aktibolms.dto.auth.TokenRefreshRequest;
import com.aktibolms.entity.RefreshToken;
import com.aktibolms.entity.User;
import com.aktibolms.repository.RefreshTokenRepository;
import com.aktibolms.repository.UserRepository;
import com.aktibolms.security.CustomUserDetailsService;
import com.aktibolms.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        try {
            User.Role role = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: must be STUDENT or INSTRUCTOR");
        }

        User user = User.builder()
                .id(UUID.randomUUID())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(User.Role.valueOf(request.getRole().toUpperCase()))
                .build();

        user = userRepository.save(user);

        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());
        storeRefreshToken(user, refreshToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId().toString())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .role(user.getRole().name())
                        .avatarUrl(user.getAvatarUrl())
                        .build())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());
        storeRefreshToken(user, refreshToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId().toString())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .role(user.getRole().name())
                        .avatarUrl(user.getAvatarUrl())
                        .build())
                .build();
    }

    public AuthResponse refresh(TokenRefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        String tokenHash = jwtUtil.hashToken(refreshToken);

        // Find the stored refresh token
        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));

        // Check if token is revoked or expired
        if (storedToken.isRevoked() || storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Refresh token revoked or expired");
        }

        // Revoke the old token (rotation)
        storedToken.setRevoked(true);
        storedToken.setRevokedAt(LocalDateTime.now());

        User user = storedToken.getUser();

        // Generate new tokens
        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getId());

        // Store new refresh token with reference to old one
        RefreshToken newStoredToken = RefreshToken.builder()
                .id(UUID.randomUUID())
                .user(user)
                .tokenHash(jwtUtil.hashToken(newRefreshToken))
                .expiresAt(LocalDateTime.now().plus(jwtUtil.getRefreshTokenExpiration(), ChronoUnit.MILLIS))
                .revoked(false)
                .replacedByTokenHash(tokenHash)
                .build();
        refreshTokenRepository.save(newStoredToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId().toString())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .role(user.getRole().name())
                        .avatarUrl(user.getAvatarUrl())
                        .build())
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse.UserDTO getCurrentUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return AuthResponse.UserDTO.builder()
                .id(user.getId().toString())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    private void storeRefreshToken(User user, String refreshToken) {
        RefreshToken storedToken = RefreshToken.builder()
                .id(UUID.randomUUID())
                .user(user)
                .tokenHash(jwtUtil.hashToken(refreshToken))
                .expiresAt(LocalDateTime.now().plus(jwtUtil.getRefreshTokenExpiration(), ChronoUnit.MILLIS))
                .revoked(false)
                .build();
        refreshTokenRepository.save(storedToken);
    }
}
