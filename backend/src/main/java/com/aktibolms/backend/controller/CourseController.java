package com.aktibolms.backend.controller;

import com.aktibolms.backend.dto.request.CourseAssignmentRequest;
import com.aktibolms.backend.dto.request.CourseRequest;
import com.aktibolms.backend.dto.response.CourseAssignmentResponse;
import com.aktibolms.backend.dto.response.CourseResponse;
import com.aktibolms.backend.service.CourseAssignmentService;
import com.aktibolms.backend.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final CourseAssignmentService assignmentService;

    public CourseController(CourseService courseService, CourseAssignmentService assignmentService) {
        this.courseService = courseService;
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(@Valid @RequestBody CourseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.createCourse(request));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getCourseById(courseId));
    }

    @GetMapping
    public ResponseEntity<Page<CourseResponse>> getCourses(
            @PageableDefault(size = 20, sort = "createdAt",
                    direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(courseService.getAllCourses(pageable));
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long courseId, @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.updateCourse(courseId, request));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Map<String, String>> archiveCourse(@PathVariable Long courseId) {
        courseService.archiveCourse(courseId);
        return ResponseEntity.ok(Map.of("message", "Course archived successfully", "id", courseId.toString()));
    }

    @PostMapping("/{courseId}/assignments")
    public ResponseEntity<CourseAssignmentResponse> assignInstructor(
            @PathVariable Long courseId, @Valid @RequestBody CourseAssignmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(assignmentService.assignInstructor(courseId, request));
    }

    @GetMapping("/{courseId}/assignments")
    public ResponseEntity<List<CourseAssignmentResponse>> getAssignments(@PathVariable Long courseId) {
        return ResponseEntity.ok(assignmentService.getAssignments(courseId));
    }

    @DeleteMapping("/{courseId}/assignments/{assignmentId}")
    public ResponseEntity<Map<String, String>> removeAssignment(
            @PathVariable Long courseId, @PathVariable Long assignmentId) {
        assignmentService.removeAssignment(courseId, assignmentId);
        return ResponseEntity.ok(Map.of(
                "message", "Instructor assignment removed successfully",
                "id", assignmentId.toString()
        ));
    }
}
