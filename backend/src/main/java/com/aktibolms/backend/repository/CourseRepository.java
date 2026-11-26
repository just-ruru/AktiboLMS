package com.aktibolms.backend.repository;

import com.aktibolms.backend.entity.Course;
import com.aktibolms.backend.entity.CourseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String courseCode);

    Page<Course> findByStatusNot(CourseStatus status, Pageable pageable);
}
