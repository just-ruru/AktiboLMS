package com.aktibolms.backend.controller;

import com.aktibolms.backend.dto.request.InstructorRequest;
import com.aktibolms.backend.dto.response.InstructorResponse;
import com.aktibolms.backend.service.InstructorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for Instructor CRUD operations.
 *
 * Base path: /api/instructors
 *
 * Endpoints:
 *   POST   /api/instructors              - Create instructor profile
 *   GET    /api/instructors/{id}         - Get instructor profile
 *   GET    /api/instructors              - List all active instructors
 *   PUT    /api/instructors/{id}         - Update instructor profile
 *   DELETE /api/instructors/{id}         - Deactivate instructor account (soft delete)
 *
 * NOTE: Subject/Module CRUD (create, read, update, delete subjects and modules owned
 * by an instructor) is intentionally NOT included here — that work is assigned to a
 * separate teammate and will live under its own controller when ready.
 *
 * These endpoints are open (no auth) for local development. Secure them with
 * Spring Security + JWT when the auth layer is built.
 */
@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public ResponseEntity<InstructorResponse> createInstructor(@Valid @RequestBody InstructorRequest request) {
        InstructorResponse created = instructorService.createInstructor(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponse> getInstructorById(@PathVariable Long id) {
        InstructorResponse instructor = instructorService.getInstructorById(id);
        return ResponseEntity.ok(instructor);
    }

    @GetMapping
    public ResponseEntity<List<InstructorResponse>> getAllInstructors() {
        List<InstructorResponse> instructors = instructorService.getAllInstructors();
        return ResponseEntity.ok(instructors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstructorResponse> updateInstructor(
            @PathVariable Long id,
            @Valid @RequestBody InstructorRequest request) {
        InstructorResponse updated = instructorService.updateInstructor(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deactivateInstructor(@PathVariable Long id) {
        instructorService.deactivateInstructor(id);
        return ResponseEntity.ok(Map.of(
                "message", "Instructor account deactivated successfully",
                "id", id.toString()
        ));
    }
}
