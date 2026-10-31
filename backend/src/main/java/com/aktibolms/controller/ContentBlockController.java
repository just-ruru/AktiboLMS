package com.aktibolms.controller;

import com.aktibolms.dto.request.ContentBlockRequest;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.dto.response.ContentBlockResponse;
import com.aktibolms.entity.ContentBlock;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/lessons/{lessonId}/content-blocks")
@RequiredArgsConstructor
public class ContentBlockController {

    private final CourseService courseService;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ContentBlockResponse> createContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @RequestBody ContentBlockRequest request) {

        ContentBlock block = courseService.createContentBlock(lessonId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(block));
    }

    @PutMapping("/{blockId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ContentBlockResponse> updateContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @PathVariable UUID blockId,
            @RequestBody ContentBlockRequest request) {

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
            @RequestBody ReorderRequest request) {

        courseService.reorderContentBlocks(lessonId, request.getItems(), userDetails.getId());
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
