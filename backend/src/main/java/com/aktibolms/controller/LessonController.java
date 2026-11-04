package com.aktibolms.controller;

import com.aktibolms.dto.request.LessonRequest;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.dto.response.ActivityResponse;
import com.aktibolms.dto.response.ContentBlockResponse;
import com.aktibolms.dto.response.LessonResponse;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.ContentBlock;
import com.aktibolms.entity.Lesson;
import com.aktibolms.repository.LessonRepository;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import jakarta.validation.Valid;
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
    private final LessonRepository lessonRepository;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponse> createLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @Valid @RequestBody LessonRequest request) {

        Lesson lesson = courseService.createLesson(moduleId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(lesson));
    }

    @PutMapping("/{lessonId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponse> updateLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @PathVariable UUID lessonId,
            @Valid @RequestBody LessonRequest request) {

        Lesson lesson = courseService.updateLesson(lessonId, request, userDetails.getId());
        // Re-fetch with JOIN FETCH to avoid N+1
        lesson = lessonRepository.findByIdWithContentBlocksAndActivities(lessonId).orElse(lesson);
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
        // Use eagerly loaded collections (JOIN FETCH) to avoid N+1 queries
        // Collections are ordered by @OrderBy("orderIndex ASC") in entity
        List<ContentBlock> blocks = lesson.getContentBlocks() != null ? lesson.getContentBlocks() : List.of();
        List<Activity> activities = lesson.getActivities() != null ? lesson.getActivities() : List.of();

        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .orderIndex(lesson.getOrderIndex())
                .moduleId(lesson.getModule().getId())
                .contentBlocks(blocks.stream().map(this::toContentBlockResponse).collect(Collectors.toList()))
                .activities(activities.stream().map(this::toActivityResponse).collect(Collectors.toList()))
                .createdAt(lesson.getCreatedAt())
                .build();
    }

    private ContentBlockResponse toContentBlockResponse(ContentBlock block) {
        return ContentBlockResponse.builder()
                .id(block.getId())
                .type(block.getType().name())
                .content(block.getContentJson())
                .orderIndex(block.getOrderIndex())
                .lessonId(block.getLesson().getId())
                .createdAt(block.getCreatedAt())
                .build();
    }

    private ActivityResponse toActivityResponse(Activity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .title(activity.getType().name())
                .type(activity.getType().name())
                .config(activity.getConfigJson())
                .orderIndex(activity.getOrderIndex())
                .points(activity.getPoints())
                .lessonId(activity.getLesson().getId())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build();
    }
}
