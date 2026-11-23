package com.aktibolms.repository;

import com.aktibolms.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, UUID> {

    List<Activity> findByLessonIdOrderByOrderIndexAsc(UUID lessonId);

    List<Activity> findByLesson_Module_Course_Id(UUID courseId);

    @Query("SELECT a FROM Activity a JOIN FETCH a.lesson WHERE a.lesson.module.course.id = :courseId")
    List<Activity> findByCourseIdWithLesson(@Param("courseId") UUID courseId);
}