package com.aktibolms.service;

import com.aktibolms.dto.auth.AuthResponse;
import com.aktibolms.dto.auth.LoginRequest;
import com.aktibolms.dto.auth.RegisterRequest;
import com.aktibolms.dto.auth.TokenRefreshRequest;
import com.aktibolms.entity.RefreshToken;
import com.aktibolms.entity.User;
import com.aktibolms.repository.RefreshTokenRepository;
import com.aktibolms.repository.UserRepository;
import com.aktibolms.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private UUID testUserId;
    private User testUser;
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private TokenRefreshRequest refreshRequest;

    @BeforeEach
    void setUp() {
        testUserId = UUID.randomUUID();
        testUser = User.builder()
                .id(testUserId)
                .email("test@example.com")
                .password("encoded-password")
                .fullName("Test User")
                .role(User.Role.STUDENT)
                .build();

        registerRequest = new RegisterRequest();
        registerRequest.setEmail("newuser@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setFullName("New User");
        registerRequest.setRole("student");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        refreshRequest = new TokenRefreshRequest();
        refreshRequest.setRefreshToken("refresh-token-value");
    }

    @Test
    void register_shouldSucceed_whenValidRequest() {
        // Given
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(testUserId);
            return u;
        });
        when(jwtUtil.generateAccessToken(testUserId, "newuser@example.com", "STUDENT"))
                .thenReturn("access-token");
        when(jwtUtil.generateRefreshToken(testUserId)).thenReturn("refresh-token");

        // When
        AuthResponse response = authService.register(registerRequest);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("access-token");
        assertThat(response.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(response.getUser().getEmail()).isEqualTo("newuser@example.com");
        assertThat(response.getUser().getRole()).isEqualTo("STUDENT");
        verify(userRepository).save(any(User.class));
        verify(refreshTokenRepository).save(any(RefreshToken.class));
    }

    @Test
    void register_shouldThrow_whenEmailAlreadyRegistered() {
        // Given
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(true);

        // When / Then
        assertThatThrownBy(() -> authService.register(registerRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email already registered");
        verify(userRepository, never()).save(any());
    }

    @Test
    void register_shouldThrow_whenInvalidRole() {
        // Given
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        registerRequest.setRole("invalid-role");

        // When / Then
        assertThatThrownBy(() -> authService.register(registerRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid role: must be STUDENT or INSTRUCTOR");
    }

    @Test
    void login_shouldSucceed_whenValidCredentials() {
        // Given
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encoded-password")).thenReturn(true);
        when(jwtUtil.generateAccessToken(testUserId, "test@example.com", "STUDENT"))
                .thenReturn("access-token");
        when(jwtUtil.generateRefreshToken(testUserId)).thenReturn("refresh-token");

        // When
        AuthResponse response = authService.login(loginRequest);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("access-token");
        assertThat(response.getUser().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void login_shouldThrow_whenUserNotFound() {
        // Given
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());
        loginRequest.setEmail("nonexistent@example.com");

        // When / Then
        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid email or password");
    }

    @Test
    void login_shouldThrow_whenWrongPassword() {
        // Given
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongpassword", "encoded-password")).thenReturn(false);
        loginRequest.setPassword("wrongpassword");

        // When / Then
        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid email or password");
    }

    @Test
    void refresh_shouldSucceed_whenValidToken() {
        // Given
        RefreshToken storedToken = RefreshToken.builder()
                .id(UUID.randomUUID())
                .user(testUser)
                .tokenHash("hashed-token")
                .expiresAt(LocalDateTime.now().plusDays(7))
                .revoked(false)
                .build();
        when(jwtUtil.hashToken("refresh-token-value")).thenReturn("hashed-token");
        when(refreshTokenRepository.findByTokenHash("hashed-token")).thenReturn(Optional.of(storedToken));
        when(jwtUtil.generateAccessToken(testUserId, "test@example.com", "STUDENT"))
                .thenReturn("new-access-token");
        when(jwtUtil.generateRefreshToken(testUserId)).thenReturn("new-refresh-token");
        when(jwtUtil.getRefreshTokenExpiration()).thenReturn(604800000L);

        // When
        AuthResponse response = authService.refresh(refreshRequest);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("new-access-token");
        assertThat(response.getRefreshToken()).isEqualTo("new-refresh-token");
        // Old token should be revoked
        assertThat(storedToken.isRevoked()).isTrue();
        // New token should be stored
        verify(refreshTokenRepository).save(any(RefreshToken.class));
    }

    @Test
    void refresh_shouldThrow_whenInvalidToken() {
        // Given
        when(jwtUtil.hashToken("refresh-token-value")).thenReturn("hashed-token");
        when(refreshTokenRepository.findByTokenHash("hashed-token")).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> authService.refresh(refreshRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid refresh token");
    }

    @Test
    void refresh_shouldThrow_whenTokenRevoked() {
        // Given
        RefreshToken revokedToken = RefreshToken.builder()
                .id(UUID.randomUUID())
                .user(testUser)
                .tokenHash("hashed-token")
                .expiresAt(LocalDateTime.now().plusDays(7))
                .revoked(true)
                .build();
        when(jwtUtil.hashToken("refresh-token-value")).thenReturn("hashed-token");
        when(refreshTokenRepository.findByTokenHash("hashed-token")).thenReturn(Optional.of(revokedToken));

        // When / Then
        assertThatThrownBy(() -> authService.refresh(refreshRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Refresh token revoked or expired");
    }

    @Test
    void getCurrentUser_shouldSucceed_whenUserExists() {
        // Given
        when(userRepository.findById(testUserId)).thenReturn(Optional.of(testUser));

        // When
        AuthResponse.UserDTO user = authService.getCurrentUser(testUserId);

        // Then
        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo(testUserId.toString());
        assertThat(user.getEmail()).isEqualTo("test@example.com");
        assertThat(user.getFullName()).isEqualTo("Test User");
    }

    @Test
    void getCurrentUser_shouldThrow_whenUserNotFound() {
        // Given
        when(userRepository.findById(testUserId)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> authService.getCurrentUser(testUserId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("User not found");
    }
}
