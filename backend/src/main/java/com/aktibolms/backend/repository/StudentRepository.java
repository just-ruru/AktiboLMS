package com.aktibolms.backend.repository;

import com.aktibolms.backend.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Data access layer for Student entities.
 *
 * Spring Data JPA provides the CRUD implementation automatically. We add a few
 * custom query methods for lookups by studentId and email, plus a paginated
 * query for active students used by the list endpoint.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByStudentId(String studentId);

    Optional<Student> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByStudentId(String studentId);

    Page<Student> findByIsActiveTrue(Pageable pageable);
}
