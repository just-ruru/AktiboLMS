package com.aktibolms.controller;

import com.aktibolms.dto.request.ModuleRequest;
import com.aktibolms.entity.Module;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Top-level by-id endpoints for modules.
 * Frontend calls PUT /modules/{id} and DELETE /modules/{id} via hooks/useModules.ts.
 */
@RestController
@RequestMapping("/modules")
@RequiredArgsConstructor
public class ModuleByIdController {

    private final CourseService courseService;

    @PutMapping("/{moduleId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> updateModule(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId,
            @RequestBody ModuleRequest request) {

        courseService.updateModule(moduleId,
                Module.builder()
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .orderIndex(request.getOrderIndex())
                        .build(),
                userDetails.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{moduleId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteModule(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID moduleId) {

        courseService.deleteModule(moduleId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }
}
