package com.aktibolms.repository;

import com.aktibolms.entity.RefreshToken;
import com.aktibolms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    @Query("SELECT rt FROM RefreshToken rt WHERE rt.user = :user AND rt.revoked = false AND rt.expiresAt > :now")
    Optional<RefreshToken> findValidByUser(@Param("user") User user, @Param("now") LocalDateTime now);

    @Query("UPDATE RefreshToken rt SET rt.revoked = true, rt.revokedAt = :now WHERE rt.tokenHash = :tokenHash AND rt.revoked = false")
    int revokeByTokenHash(@Param("tokenHash") String tokenHash, @Param("now") LocalDateTime now);

    @Query("UPDATE RefreshToken rt SET rt.revoked = true, rt.revokedAt = :now WHERE rt.user = :user AND rt.revoked = false")
    int revokeAllByUser(@Param("user") User user, @Param("now") LocalDateTime now);

    void deleteByExpiresAtBefore(LocalDateTime expiresAt);
}