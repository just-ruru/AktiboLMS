package com.aktibolms.backend.controller;

import com.aktibolms.backend.dto.request.StudentRequest;
import com.aktibolms.backend.dto.response.StudentResponse;
import com.aktibolms.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for Student CRUD operations.
 *
 * Base path: /api/students
 *
 * Endpoints:
 *   POST   /api/students              - Create student account
 *   GET    /api/students/{id}         - Get student profile (own profile only)
 *   GET    /api/students              - List all active students
 *   PUT    /api/students/{id}         - Update student profile
 *   DELETE /api/students/{id}         - Deactivate student account (soft delete)
 *
 * These endpoints are open (no auth) for local development. Secure them with
 * Spring Security + JWT when the auth layer is built.
 */
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest request) {
        StudentResponse created = studentService.createStudent(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable Long id) {
        StudentResponse student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        List<StudentResponse> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request) {
        StudentResponse updated = studentService.updateStudent(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deactivateStudent(@PathVariable Long id) {
        studentService.deactivateStudent(id);
        return ResponseEntity.ok(Map.of(
                "message", "Student account deactivated successfully",
                "id", id.toString()
        ));
    }
}
