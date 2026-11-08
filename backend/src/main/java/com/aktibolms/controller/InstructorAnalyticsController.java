package com.aktibolms.controller;

import com.aktibolms.dto.response.CourseAnalytics;
import com.aktibolms.dto.response.SubmissionSummary;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.InstructorAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/instructor")
@RequiredArgsConstructor
public class InstructorAnalyticsController {

    private final InstructorAnalyticsService analyticsService;

    @GetMapping("/courses/{courseId}/analytics")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<CourseAnalytics> getCourseAnalytics(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID courseId) {

        CourseAnalytics analytics = analyticsService.getCourseAnalytics(courseId, userDetails.getId());
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/activities/{activityId}/submissions")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<List<SubmissionSummary>> getActivitySubmissions(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID activityId) {
        List<SubmissionSummary> submissions = analyticsService.getActivitySubmissions(activityId);
        return ResponseEntity.ok(submissions);
    }
}
