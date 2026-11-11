package com.aktibolms.backend.repository;

import com.aktibolms.backend.entity.Instructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    Optional<Instructor> findByInstructorId(String instructorId);

    Optional<Instructor> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByInstructorId(String instructorId);

    Page<Instructor> findByIsActiveTrue(Pageable pageable);
}
