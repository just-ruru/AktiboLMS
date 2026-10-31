package com.aktibolms.repository;

import com.aktibolms.entity.Course;
import com.aktibolms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

    Page<Course> findByInstructorId(UUID instructorId, Pageable pageable);

    Page<Course> findByPublishedTrue(Pageable pageable);

    @Query("SELECT c FROM Course c WHERE c.published = true AND (LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Course> searchPublishedCourses(@Param("search") String search, Pageable pageable);

    @Query("SELECT DISTINCT c FROM Course c JOIN c.modules m JOIN m.lessons l JOIN l.activities a WHERE a.id IN (SELECT ap.activity.id FROM ActivityProgress ap WHERE ap.user.id = :userId AND ap.status = 'COMPLETED')")
    List<Course> findCompletedCoursesByUser(@Param("userId") UUID userId);

    @Query("SELECT c FROM Course c LEFT JOIN FETCH c.modules m LEFT JOIN FETCH m.lessons WHERE c.id = :id")
    Optional<Course> findByIdWithModules(@Param("id") UUID id);

    long countByInstructorId(UUID instructorId);
}