package com.aktibolms.repository;

import com.aktibolms.entity.Module;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ModuleRepository extends JpaRepository<Module, UUID> {

    List<Module> findByCourseIdOrderByOrderIndexAsc(UUID courseId);

    Page<Module> findByCourseId(UUID courseId, Pageable pageable);

    List<Module> findByCourseId(UUID courseId);

    @Query("SELECT m FROM Module m LEFT JOIN FETCH m.course WHERE m.id = ?1")
    Optional<Module> findByIdWithCourse(UUID moduleId);
}