package com.aktibolms.backend.repository;

import com.aktibolms.backend.entity.CourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Long> {

    List<CourseAssignment> findByCourseIdAndIsActiveTrueOrderByCreatedAtAsc(Long courseId);

    Optional<CourseAssignment> findByIdAndCourseIdAndIsActiveTrue(Long id, Long courseId);

    Optional<CourseAssignment> findByCourseIdAndInstructorIdAndSemesterAndAcademicYear(
            Long courseId, Long instructorId, String semester, String academicYear);
}
