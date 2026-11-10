package com.aktibolms.backend.repository;

import com.aktibolms.backend.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Data access layer for Instructor entities.
 *
 * Spring Data JPA provides the CRUD implementation automatically. We add a few
 * custom query methods for lookups by instructorId and email.
 */
@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    Optional<Instructor> findByInstructorId(String instructorId);

    Optional<Instructor> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByInstructorId(String instructorId);
}
