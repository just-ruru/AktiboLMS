package com.aktibolms.repository;

import com.aktibolms.entity.CodeSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CodeSubmissionRepository extends JpaRepository<CodeSubmission, UUID> {

    List<CodeSubmission> findByUserIdAndActivityIdOrderByCreatedAtDesc(UUID userId, UUID activityId);

    @Query("SELECT cs FROM CodeSubmission cs WHERE cs.activity.id = :activityId ORDER BY cs.createdAt DESC")
    List<CodeSubmission> findByActivityIdOrderByCreatedAtDesc(@Param("activityId") UUID activityId);

    @Query("SELECT cs FROM CodeSubmission cs WHERE cs.user.id = :userId AND cs.passed = true")
    List<CodeSubmission> findPassedByUserId(@Param("userId") UUID userId);
}