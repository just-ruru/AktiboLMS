package com.aktibolms.controller;

import com.aktibolms.dto.request.LessonRequest;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.dto.response.LessonResponse;
import com.aktibolms.entity.Lesson;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/modules/{moduleId}/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final CourseService courseService;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponse> createLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @RequestBody LessonRequest request) {

        Lesson lesson = courseService.createLesson(moduleId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(lesson));
    }

    @PutMapping("/{lessonId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponse> updateLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @PathVariable UUID lessonId,
            @RequestBody LessonRequest request) {

        Lesson lesson = courseService.updateLesson(lessonId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(lesson));
    }

    @DeleteMapping("/{lessonId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @PathVariable UUID lessonId) {
        courseService.deleteLesson(lessonId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> reorderLessons(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @RequestBody ReorderRequest request) {

        courseService.reorderLessons(moduleId, request.getItems(), userDetails.getId());
        return ResponseEntity.ok().build();
    }

    private LessonResponse toResponse(Lesson lesson) {
        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .orderIndex(lesson.getOrderIndex())
                .moduleId(lesson.getModule().getId())
                .contentBlocks(List.of())
                .activities(List.of())
                .createdAt(lesson.getCreatedAt())
                .build();
    }
}
