package com.aktibolms.controller;

import com.aktibolms.dto.request.CourseRequest;
import com.aktibolms.dto.response.CourseResponse;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.ActivityProgress;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.Lesson;
import com.aktibolms.entity.Module;
import com.aktibolms.entity.User;
import com.aktibolms.repository.ActivityProgressRepository;
import com.aktibolms.repository.EnrollmentRepository;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import com.aktibolms.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;
    private final ActivityProgressRepository activityProgressRepository;
    private final EnrollmentRepository enrollmentRepository;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<CourseResponse> createCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CourseRequest request) {

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
    public ResponseEntity<List<CourseResponse>> myCourses(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Course> courses = courseService.getMyCourses(userDetails.getId());
        return ResponseEntity.ok(courses.stream().map(this::toResponse).toList());
    }

    @GetMapping("/enrolled")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<CourseResponse>> getEnrolledCourses(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Course> courses = courseService.getEnrolledCoursesWithProgress(userDetails.getId());
        List<CourseResponse> responses = new ArrayList<>();
        for (Course course : courses) {
            // Calculate progress for this course
            int totalActivities = 0;
            int completedActivities = 0;

            if (course.getModules() != null) {
                for (Module module : course.getModules()) {
                    if (module.getLessons() != null) {
                        for (Lesson lesson : module.getLessons()) {
                            if (lesson.getActivities() != null) {
                                totalActivities += lesson.getActivities().size();
                                for (com.aktibolms.entity.Activity activity : lesson.getActivities()) {
                                    var progress = activityProgressRepository.findByUserIdAndActivityId(userDetails.getId(), activity.getId());
                                    if (progress.isPresent() && progress.get().getStatus() == com.aktibolms.entity.ActivityProgress.Status.COMPLETED) {
                                        completedActivities++;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            int progress = totalActivities > 0 ? (completedActivities * 100 / totalActivities) : 0;
            CourseResponse response = toResponse(course);
            // Get enrolled count for this course
            long enrolledCount = enrollmentRepository.countByCourseId(course.getId());
            response.setEnrolledCount((int) enrolledCount);
            response.setProgress(progress);
            responses.add(response);
        }
        return ResponseEntity.ok(responses);
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
            @Valid @RequestBody CourseRequest request) {

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
        courseService.enrollStudent(id, userDetails.getId());
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
