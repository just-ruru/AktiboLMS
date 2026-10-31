package com.aktibolms.repository;

import com.aktibolms.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, UUID> {

    List<QuizAttempt> findByUserIdAndActivityIdOrderByCreatedAtDesc(UUID userId, UUID activityId);

    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.activity.id = :activityId ORDER BY qa.createdAt DESC")
    List<QuizAttempt> findByActivityIdOrderByCreatedAtDesc(@Param("activityId") UUID activityId);

    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.user.id = :userId AND qa.passed = true")
    List<QuizAttempt> findPassedByUserId(@Param("userId") UUID userId);

    long countByActivityIdAndPassedTrue(UUID activityId);
}