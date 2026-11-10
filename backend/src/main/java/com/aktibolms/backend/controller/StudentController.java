package com.aktibolms.backend.controller;

import com.aktibolms.backend.dto.request.StudentRequest;
import com.aktibolms.backend.dto.response.StudentResponse;
import com.aktibolms.backend.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
@Tag(name = "Students", description = "Student account CRUD operations")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Operation(summary = "Create student account", description = "Registers a new student. Student ID and email must be unique.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Student created",
                    content = @Content(schema = @Schema(implementation = StudentResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation failed or duplicate studentId/email"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest request) {
        StudentResponse created = studentService.createStudent(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @Operation(summary = "Get student profile by ID", description = "Returns a single active student's profile. Does not include password.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student found",
                    content = @Content(schema = @Schema(implementation = StudentResponse.class))),
            @ApiResponse(responseCode = "404", description = "Student not found or inactive"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(
            @Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        StudentResponse student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @Operation(summary = "List all active students", description = "Returns a paginated list of active students. Default page size is 20, sorted by createdAt descending.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paginated list of students",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<Page<StudentResponse>> getAllStudents(
            @Parameter(hidden = true)
            @PageableDefault(size = 20, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        Page<StudentResponse> students = studentService.getAllStudents(pageable);
        return ResponseEntity.ok(students);
    }

    @Operation(summary = "Update student profile", description = "Updates an active student's profile. Password is re-hashed only if a new one is provided.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student updated",
                    content = @Content(schema = @Schema(implementation = StudentResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation failed or duplicate studentId/email"),
            @ApiResponse(responseCode = "404", description = "Student not found or inactive"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @Parameter(description = "Student ID", example = "1") @PathVariable Long id,
            @Valid @RequestBody StudentRequest request) {
        StudentResponse updated = studentService.updateStudent(id, request);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Deactivate student account", description = "Soft-deletes a student by setting isActive = false.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student deactivated"),
            @ApiResponse(responseCode = "404", description = "Student not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deactivateStudent(
            @Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        studentService.deactivateStudent(id);
        return ResponseEntity.ok(Map.of(
                "message", "Student account deactivated successfully",
                "id", id.toString()
        ));
    }
}
