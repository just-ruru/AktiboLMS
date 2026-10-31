package com.aktibolms.repository;

import com.aktibolms.entity.ActivityProgress;
import com.aktibolms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ActivityProgressRepository extends JpaRepository<ActivityProgress, UUID> {

    Optional<ActivityProgress> findByUserIdAndActivityId(UUID userId, UUID activityId);

    List<ActivityProgress> findByUserId(UUID userId);

    @Query("SELECT ap FROM ActivityProgress ap JOIN ap.activity a WHERE a.lesson.module.course.id = :courseId AND ap.user.id = :userId")
    List<ActivityProgress> findByCourseIdAndUserId(@Param("courseId") UUID courseId, @Param("userId") UUID userId);

    @Query("SELECT ap FROM ActivityProgress ap JOIN ap.activity a WHERE a.lesson.module.course.id = :courseId AND ap.status = 'COMPLETED'")
    List<ActivityProgress> findCompletedByCourseId(@Param("courseId") UUID courseId);

    long countByUserIdAndStatus(UUID userId, String status);

    @Query("SELECT ap FROM ActivityProgress ap JOIN ap.activity a WHERE a.lesson.id = :lessonId AND ap.user.id = :userId")
    List<ActivityProgress> findByActivity_LessonIdAndUserId(@Param("lessonId") UUID lessonId, @Param("userId") UUID userId);
}