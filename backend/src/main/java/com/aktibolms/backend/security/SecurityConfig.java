package com.aktibolms.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Security configuration beans.
 *
 * Provides a BCryptPasswordEncoder bean used by StudentService and InstructorService
 * to hash passwords before storage.
 *
 * NOTE: Full Spring Security filter chain (JWT authentication, role-based access,
 * login/logout endpoints) is intentionally left for a follow-up task. For now the
 * encoder bean is registered so password hashing works; endpoints are open (no auth
 * required) which is fine for local development and Postman testing.
 */
@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
