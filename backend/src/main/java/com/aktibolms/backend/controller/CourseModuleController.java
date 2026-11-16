package com.aktibolms.backend.controller;

import com.aktibolms.backend.dto.request.CourseModuleRequest;
import com.aktibolms.backend.dto.response.CourseModuleResponse;
import com.aktibolms.backend.service.CourseModuleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses/{courseId}/modules")
public class CourseModuleController {

    private final CourseModuleService moduleService;

    public CourseModuleController(CourseModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping
    public ResponseEntity<CourseModuleResponse> createModule(
            @PathVariable Long courseId, @Valid @RequestBody CourseModuleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(moduleService.createModule(courseId, request));
    }

    @GetMapping
    public ResponseEntity<List<CourseModuleResponse>> getModules(@PathVariable Long courseId) {
        return ResponseEntity.ok(moduleService.getModules(courseId));
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<CourseModuleResponse> getModule(
            @PathVariable Long courseId, @PathVariable Long moduleId) {
        return ResponseEntity.ok(moduleService.getModule(courseId, moduleId));
    }

    @PutMapping("/{moduleId}")
    public ResponseEntity<CourseModuleResponse> updateModule(
            @PathVariable Long courseId,
            @PathVariable Long moduleId,
            @Valid @RequestBody CourseModuleRequest request) {
        return ResponseEntity.ok(moduleService.updateModule(courseId, moduleId, request));
    }

    @DeleteMapping("/{moduleId}")
    public ResponseEntity<Map<String, String>> archiveModule(
            @PathVariable Long courseId, @PathVariable Long moduleId) {
        moduleService.archiveModule(courseId, moduleId);
        return ResponseEntity.ok(Map.of("message", "Module archived successfully", "id", moduleId.toString()));
    }
}
