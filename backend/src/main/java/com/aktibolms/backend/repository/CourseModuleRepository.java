package com.aktibolms.backend.repository;

import com.aktibolms.backend.entity.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {

    List<CourseModule> findByCourseIdAndIsArchivedFalseOrderBySequenceOrderAsc(Long courseId);

    Optional<CourseModule> findByIdAndCourseIdAndIsArchivedFalse(Long id, Long courseId);

    boolean existsByCourseIdAndSequenceOrder(Long courseId, Integer sequenceOrder);

    boolean existsByCourseIdAndSequenceOrderAndIdNot(Long courseId, Integer sequenceOrder, Long id);
}
