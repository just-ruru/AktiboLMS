package com.aktibolms.backend.controller;

import com.aktibolms.backend.dto.request.InstructorRequest;
import com.aktibolms.backend.dto.response.InstructorResponse;
import com.aktibolms.backend.service.InstructorService;
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
@Tag(name = "Instructors", description = "Instructor profile CRUD operations")
@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @Operation(summary = "Create instructor profile", description = "Registers a new instructor. Instructor ID and email must be unique.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Instructor created",
                    content = @Content(schema = @Schema(implementation = InstructorResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation failed or duplicate instructorId/email"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<InstructorResponse> createInstructor(@Valid @RequestBody InstructorRequest request) {
        InstructorResponse created = instructorService.createInstructor(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @Operation(summary = "Get instructor profile by ID", description = "Returns a single active instructor's profile. Does not include password.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Instructor found",
                    content = @Content(schema = @Schema(implementation = InstructorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Instructor not found or inactive"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponse> getInstructorById(
            @Parameter(description = "Instructor ID", example = "1") @PathVariable Long id) {
        InstructorResponse instructor = instructorService.getInstructorById(id);
        return ResponseEntity.ok(instructor);
    }

    @Operation(summary = "List all active instructors", description = "Returns a paginated list of active instructors. Default page size is 20, sorted by createdAt descending.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paginated list of instructors",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<Page<InstructorResponse>> getAllInstructors(
            @Parameter(hidden = true)
            @PageableDefault(size = 20, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        Page<InstructorResponse> instructors = instructorService.getAllInstructors(pageable);
        return ResponseEntity.ok(instructors);
    }

    @Operation(summary = "Update instructor profile", description = "Updates an active instructor's profile. Password is re-hashed only if a new one is provided.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Instructor updated",
                    content = @Content(schema = @Schema(implementation = InstructorResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation failed or duplicate instructorId/email"),
            @ApiResponse(responseCode = "404", description = "Instructor not found or inactive"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/{id}")
    public ResponseEntity<InstructorResponse> updateInstructor(
            @Parameter(description = "Instructor ID", example = "1") @PathVariable Long id,
            @Valid @RequestBody InstructorRequest request) {
        InstructorResponse updated = instructorService.updateInstructor(id, request);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Deactivate instructor account", description = "Soft-deletes an instructor by setting isActive = false.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Instructor deactivated"),
            @ApiResponse(responseCode = "404", description = "Instructor not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deactivateInstructor(
            @Parameter(description = "Instructor ID", example = "1") @PathVariable Long id) {
        instructorService.deactivateInstructor(id);
        return ResponseEntity.ok(Map.of(
                "message", "Instructor account deactivated successfully",
                "id", id.toString()
        ));
    }
}
