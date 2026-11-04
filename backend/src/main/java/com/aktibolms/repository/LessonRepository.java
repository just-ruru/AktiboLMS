package com.aktibolms.repository;

import com.aktibolms.entity.Lesson;
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
public interface LessonRepository extends JpaRepository<Lesson, UUID> {

    List<Lesson> findByModuleIdOrderByOrderIndexAsc(UUID moduleId);

    Page<Lesson> findByModuleId(UUID moduleId, Pageable pageable);

    @Query("SELECT l FROM Lesson l LEFT JOIN FETCH l.contentBlocks cb LEFT JOIN FETCH l.activities a WHERE l.id = :id")
    Optional<Lesson> findByIdWithContentBlocksAndActivities(@Param("id") UUID id);
}