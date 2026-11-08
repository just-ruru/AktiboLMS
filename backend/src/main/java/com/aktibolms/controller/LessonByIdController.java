package com.aktibolms.controller;

import com.aktibolms.dto.request.LessonRequest;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.dto.response.LessonResponse;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Top-level by-id endpoints for lessons.
 * Frontend calls GET/PUT/DELETE /lessons/{id} and PUT /lessons/reorder via
 * hooks/useLesson.ts (useLessonById, useUpdateLesson, useDeleteLesson, useReorderLessons).
 */
@RestController
@RequestMapping("/lessons")
@RequiredArgsConstructor
public class LessonByIdController {

    private final CourseService courseService;

    @GetMapping("/{lessonId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<LessonResponse> getLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId) {

        LessonResponse lesson = courseService.getLessonById(lessonId, userDetails.getId());
        return ResponseEntity.ok(lesson);
    }

    @PutMapping("/{lessonId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> updateLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @RequestBody LessonRequest request) {

        courseService.updateLesson(lessonId, request, userDetails.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{lessonId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId) {

        courseService.deleteLesson(lessonId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> reorderLessons(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody List<ReorderRequest.Item> items) {

        if (items == null || items.isEmpty()) {
            return ResponseEntity.ok().build();
        }

        // Derive the owning module from the first item so authorization can run
        UUID moduleId = courseService.findModuleIdByLessonId(items.get(0).getId());
        courseService.reorderLessons(moduleId, items, userDetails.getId());
        return ResponseEntity.ok().build();
    }
}
