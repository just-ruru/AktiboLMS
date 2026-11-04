package com.aktibolms.security;

import com.aktibolms.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
        protected void doFilterInternal(
                @NonNull HttpServletRequest request,
                @NonNull HttpServletResponse response,
                @NonNull FilterChain filterChain
        ) throws ServletException, IOException {

            String token = getTokenFromRequest(request);
            log.debug("JwtAuthenticationFilter.doFilterInternal called for URI: {}, token present: {}", request.getRequestURI(), StringUtils.hasText(token));

            if (StringUtils.hasText(token)) {
                log.debug("JWT token found in request to: {}", request.getRequestURI());
                try {
                    UUID userId = jwtUtil.getUserIdFromToken(token);
                    String email = jwtUtil.getEmailFromToken(token);
                    String role = jwtUtil.getRoleFromToken(token);

                    log.debug("Extracted from token - userId: {}, email: {}, role: {}", userId, email, role);

                    List<SimpleGrantedAuthority> authorities = List.of(
                            new SimpleGrantedAuthority("ROLE_" + role)
                    );

                    var user = userRepository.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

                    log.debug("Found user in DB: {}", user.getEmail());

                    CustomUserDetails userDetails = new CustomUserDetails(user, authorities);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    request.setAttribute("userId", userId);
                    log.debug("JWT Authentication successful for user: {} with role: {}", userId, role);
                    log.debug("SecurityContext authentication: {}", SecurityContextHolder.getContext().getAuthentication());
                    log.debug("Set request attribute userId: {}", request.getAttribute("userId"));
                } catch (JwtException e) {
                    // JWT-specific errors (expired, invalid signature, etc.) - don't set authentication, continue as unauthenticated
                    log.debug("Invalid JWT token: {}", e.getMessage());
                } catch (Exception e) {
                    // Unexpected errors - log and re-throw to be handled by global exception handler
                    log.error("Unexpected error during JWT authentication: ", e);
                    throw new ServletException("Authentication failed", e);
                }
            } else {
                log.debug("No JWT token found in request to: {}", request.getRequestURI());
            }

            filterChain.doFilter(request, response);
        }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}