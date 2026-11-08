package com.aktibolms.controller;

import com.aktibolms.dto.request.ContentBlockRequest;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.dto.response.ContentBlockResponse;
import com.aktibolms.entity.ContentBlock;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.Lesson;
import com.aktibolms.entity.Module;
import com.aktibolms.repository.ContentBlockRepository;
import com.aktibolms.repository.EnrollmentRepository;
import com.aktibolms.repository.LessonRepository;
import com.aktibolms.repository.ModuleRepository;
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
@RequestMapping("/lessons/{lessonId}/content-blocks")
@RequiredArgsConstructor
public class ContentBlockController {

    private final CourseService courseService;
    private final ContentBlockRepository contentBlockRepository;
    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;
    private final EnrollmentRepository enrollmentRepository;

    @GetMapping
    public ResponseEntity<List<ContentBlockResponse>> listContentBlocks(
            @PathVariable UUID lessonId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Lesson lesson = lessonRepository.findByIdWithModule(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));
        Module module = moduleRepository.findByIdWithCourse(lesson.getModule().getId())
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        Course course = module.getCourse();

        // Authorization: published courses are readable by anyone;
        // unpublished courses require instructor ownership or enrollment
        if (!course.getPublished()) {
            boolean isInstructor = userDetails != null
                    && course.getInstructor().getId().equals(userDetails.getId());
            boolean isEnrolled = userDetails != null
                    && enrollmentRepository.existsByUserIdAndCourseId(userDetails.getId(), course.getId());
            if (!isInstructor && !isEnrolled) {
                throw new IllegalArgumentException("Course not found or not accessible");
            }
        }

        List<ContentBlock> blocks = contentBlockRepository.findByLessonIdOrderByOrderIndexAsc(lessonId);
        return ResponseEntity.ok(blocks.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ContentBlockResponse> createContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @Valid @RequestBody ContentBlockRequest request) {

        ContentBlock block = courseService.createContentBlock(lessonId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(block));
    }

    @PutMapping("/{blockId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ContentBlockResponse> updateContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @PathVariable UUID blockId,
            @Valid @RequestBody ContentBlockRequest request) {

        ContentBlock block = courseService.updateContentBlock(blockId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(block));
    }

    @DeleteMapping("/{blockId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @PathVariable UUID blockId) {
        courseService.deleteContentBlock(blockId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> reorderContentBlocks(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @RequestBody List<ReorderRequest.Item> items) {

        courseService.reorderContentBlocks(lessonId, items, userDetails.getId());
        return ResponseEntity.ok().build();
    }

    private ContentBlockResponse toResponse(ContentBlock block) {
        return ContentBlockResponse.builder()
                .id(block.getId())
                .type(block.getType().name())
                .content(block.getContentJson())
                .orderIndex(block.getOrderIndex())
                .createdAt(block.getCreatedAt())
                .updatedAt(block.getUpdatedAt())
                .build();
    }
}
