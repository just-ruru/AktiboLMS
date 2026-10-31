package com.aktibolms.controller;

import com.aktibolms.dto.request.CourseRequest;
import com.aktibolms.dto.response.CourseResponse;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.User;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import com.aktibolms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<CourseResponse> createCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody CourseRequest request) {

        User instructor = userService.findById(userDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Course course = Course.builder()
                .id(UUID.randomUUID())
                .title(request.getTitle())
                .description(request.getDescription())
                .thumbnailUrl(request.getThumbnailUrl())
                .build();

        Course created = courseService.createCourse(course, instructor);
        return ResponseEntity.ok(toResponse(created));
    }

    @GetMapping("/public")
    public ResponseEntity<Page<CourseResponse>> listPublished(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Course> courses = courseService.getPublishedCourses(pageable);
        return ResponseEntity.ok(courses.map(this::toResponse));
    }

    @GetMapping("/public/search")
    public ResponseEntity<Page<CourseResponse>> searchPublished(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Course> courses;
        if (search != null && !search.isBlank()) {
            courses = courseService.searchPublishedCourses(search, pageable);
        } else {
            courses = courseService.getPublishedCourses(pageable);
        }
        return ResponseEntity.ok(courses.map(this::toResponse));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Page<CourseResponse>> myCourses(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Course> courses = courseService.getMyCourses(userDetails.getId(), pageable);
        return ResponseEntity.ok(courses.map(this::toResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable UUID id) {
        Course course = courseService.getCourseWithModules(id);
        return ResponseEntity.ok(toResponse(course));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<CourseResponse> updateCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID id,
            @RequestBody CourseRequest request) {

        Course updates = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .thumbnailUrl(request.getThumbnailUrl())
                .build();

        Course updated = courseService.updateCourse(id, updates, userDetails.getId());
        return ResponseEntity.ok(toResponse(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID id) {
        courseService.deleteCourse(id, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<CourseResponse> publishCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID id) {
        Course published = courseService.publishCourse(id, userDetails.getId());
        return ResponseEntity.ok(toResponse(published));
    }

    @PostMapping("/{id}/enroll")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> enroll(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID id) {
        // Enrollment handled via service; placeholder for now
        return ResponseEntity.ok().build();
    }

    private CourseResponse toResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .thumbnailUrl(course.getThumbnailUrl())
                .instructorId(course.getInstructor().getId().toString())
                .instructorName(course.getInstructor().getFullName())
                .published(course.getPublished())
                .moduleCount(course.getModules() != null ? course.getModules().size() : 0)
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt())
                .build();
    }
}
