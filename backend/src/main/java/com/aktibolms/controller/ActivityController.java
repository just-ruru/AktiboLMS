package com.aktibolms.controller;

import com.aktibolms.dto.request.ActivityRequest;
import com.aktibolms.dto.response.ActivityResponse;
import com.aktibolms.entity.Activity;
import com.aktibolms.repository.ActivityRepository;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.UUID;

@RestController
@RequestMapping("/lessons/{lessonId}/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;
    private final ActivityRepository activityRepository;
    private final ObjectMapper objectMapper;

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ActivityResponse> createActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @RequestBody ActivityRequest request) {

        Activity activity = activityService.createActivity(lessonId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(activity));
    }

    @PutMapping("/{activityId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<ActivityResponse> updateActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @PathVariable UUID activityId,
            @RequestBody ActivityRequest request) {

        Activity activity = activityService.updateActivity(activityId, request, userDetails.getId());
        return ResponseEntity.ok(toResponse(activity));
    }

    @DeleteMapping("/{activityId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<Void> deleteActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId,
            @PathVariable UUID activityId) {
        activityService.deleteActivity(activityId, userDetails.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{activityId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ActivityResponse> getActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID activityId) {

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found"));

        // Student view: strip solution code and test cases from config
        // Instructor view: return full config
        boolean isInstructor = "INSTRUCTOR".equals(userDetails.getRole());

        Object configToReturn = isInstructor
                ? activity.getConfigJson()
                : stripSolution(activity.getConfigJson());

        return ResponseEntity.ok(ActivityResponse.builder()
                .id(activity.getId())
                .type(activity.getType().name())
                .config(configToReturn)
                .orderIndex(activity.getOrderIndex())
                .points(activity.getPoints())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build());
    }

    private ActivityResponse toResponse(Activity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .type(activity.getType().name())
                .config(activity.getConfigJson())
                .orderIndex(activity.getOrderIndex())
                .points(activity.getPoints())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build();
    }

    private Object stripSolution(String configJson) {
        if (configJson == null || configJson.isBlank()) return null;
        try {
            JsonNode configNode = objectMapper.readTree(configJson);
            ObjectNode result = objectMapper.createObjectNode();
            result.put("language", configNode.has("language") ? configNode.get("language").asText() : null);
            result.put("starterCode", configNode.has("starterCode") ? configNode.get("starterCode").asText() : null);
            result.putNull("solutionCode");
            result.putNull("testCases");
            if (configNode.has("questions")) {
                result.set("questions", configNode.get("questions"));
            }
            return result;
        } catch (Exception e) {
            return configJson;
        }
    }
}
