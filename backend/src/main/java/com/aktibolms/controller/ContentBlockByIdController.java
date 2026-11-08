package com.aktibolms.controller;

import com.aktibolms.dto.request.ContentBlockRequest;
import com.aktibolms.dto.request.ReorderRequest;
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
 * Top-level by-id endpoints for content blocks.
 * Frontend calls PUT/DELETE /content-blocks/{id} and PUT /content-blocks/reorder via
 * hooks/useContentBlocks.ts (useUpdateContentBlock, useDeleteContentBlock, useReorderContentBlocks).
 */
@RestController
@RequestMapping("/content-blocks")
@RequiredArgsConstructor
public class ContentBlockByIdController {

    private final CourseService courseService;

    @PutMapping("/{blockId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> updateContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID blockId,
            @RequestBody ContentBlockRequest request) {

        courseService.updateContentBlock(blockId, request, userDetails.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{blockId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteContentBlock(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID blockId) {

        courseService.deleteContentBlock(blockId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> reorderContentBlocks(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody List<ReorderRequest.Item> items) {

        if (items == null || items.isEmpty()) {
            return ResponseEntity.ok().build();
        }

        UUID lessonId = courseService.findLessonIdByContentBlockId(items.get(0).getId());
        courseService.reorderContentBlocks(lessonId, items, userDetails.getId());
        return ResponseEntity.ok().build();
    }
}
