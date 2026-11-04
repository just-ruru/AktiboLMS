package com.aktibolms.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.UUID;

@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    public long getRefreshTokenExpiration() {
        return refreshTokenExpiration;
    }

    @Value("${jwt.issuer}")
    private String issuer;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        // Validate secret strength - must be at least 256 bits (32 bytes) for HS256
        byte[] secretBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (secretBytes.length < 32) {
            throw new IllegalStateException("JWT secret must be at least 32 bytes (256 bits) for HS256 algorithm. Current length: " + secretBytes.length + " bytes");
        }

        // Warn about default/weak secrets in production
        String weakSecrets = "your-super-secret-jwt-key-change-in-production-min-256-bits";
        if (secret.contains("your-super-secret") || secret.contains("change-in-production") || secret.contains("default")) {
            log.warn("SECURITY WARNING: Using default/weak JWT secret! This is NOT secure for production. Please set a strong random secret via JWT_SECRET environment variable.");
        }

        this.secretKey = Keys.hmacShaKeyFor(secretBytes);
    }

    public String generateAccessToken(UUID userId, String email, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(userId.toString())
                .claim("email", email)
                .claim("role", role)
                .issuer(issuer)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    public String generateRefreshToken(UUID userId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + refreshTokenExpiration);
        String jti = UUID.randomUUID().toString();

        return Jwts.builder()
                .subject(userId.toString())
                .id(jti)
                .issuer(issuer)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * Generate a SHA-256 hash of the token for secure storage.
     * The raw token is never stored in the database.
     */
    public String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 algorithm not available", e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public String getJtiFromToken(String token) {
        Claims claims = validateToken(token).getPayload();
        return claims.getId();
    }

    public Jws<Claims> validateToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .requireIssuer(issuer)
                .build()
                .parseSignedClaims(token);
    }

    public UUID getUserIdFromToken(String token) {
        Claims claims = validateToken(token).getPayload();
        return UUID.fromString(claims.getSubject());
    }

    public String getEmailFromToken(String token) {
        Claims claims = validateToken(token).getPayload();
        return claims.get("email", String.class);
    }

    public String getRoleFromToken(String token) {
        Claims claims = validateToken(token).getPayload();
        return claims.get("role", String.class);
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = validateToken(token).getPayload();
            return claims.getExpiration().before(new Date());
        } catch (JwtException e) {
            return true;
        }
    }
}