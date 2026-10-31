package com.aktibolms.controller;

import com.aktibolms.dto.request.ModuleRequest;
import com.aktibolms.dto.response.ModuleResponse;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.Module;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CourseService;
import com.aktibolms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.aktibolms.entity.User;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses/{courseId}/modules")
@RequiredArgsConstructor
public class ModuleController {

    private final CourseService courseService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ModuleResponse> createModule(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID courseId,
            @RequestBody ModuleRequest request) {

        User instructor = userService.findById(userDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Module module = Module.builder()
                .id(UUID.randomUUID())
                .title(request.getTitle())
                .description(request.getDescription())
                .orderIndex(request.getOrderIndex())
                .build();

        Module created = courseService.createModule(courseId, module, userDetails.getId());
        return ResponseEntity.ok(toResponse(created));
    }

    @PutMapping("/{moduleId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ModuleResponse> updateModule(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID courseId,
            @PathVariable UUID moduleId,
            @RequestBody ModuleRequest request) {

        Module updates = Module.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .orderIndex(request.getOrderIndex())
                .build();

        Module updated = courseService.updateModule(moduleId, updates, userDetails.getId());
        return ResponseEntity.ok(toResponse(updated));
    }

    @DeleteMapping("/{moduleId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteModule(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID courseId,
            @PathVariable UUID moduleId) {
        courseService.deleteModule(moduleId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reorder")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> reorderModules(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID courseId,
            @RequestBody ReorderRequest request) {

        List<Module> modules = request.getItems().stream()
                .map(item -> Module.builder()
                        .id(item.getId())
                        .orderIndex(item.getOrderIndex())
                        .build())
                .collect(Collectors.toList());

        courseService.reorderModules(courseId, modules, userDetails.getId());
        return ResponseEntity.ok().build();
    }

    private ModuleResponse toResponse(Module module) {
        return ModuleResponse.builder()
                .id(module.getId())
                .title(module.getTitle())
                .description(module.getDescription())
                .orderIndex(module.getOrderIndex())
                .lessonCount(module.getLessons() != null ? module.getLessons().size() : 0)
                .createdAt(module.getCreatedAt())
                .build();
    }
}
