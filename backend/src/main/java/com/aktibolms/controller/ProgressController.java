package com.aktibolms.controller;

import com.aktibolms.dto.request.CodeSubmitRequest;
import com.aktibolms.dto.request.QuizSubmitRequest;
import com.aktibolms.dto.response.CodeExecutionResponse;
import com.aktibolms.dto.response.ProgressResponse;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.User;
import com.aktibolms.repository.ActivityRepository;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.ActivityService;
import com.aktibolms.service.CodeExecutionService;
import com.aktibolms.service.ProgressService;
import com.aktibolms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/activities")
@RequiredArgsConstructor
public class ProgressController {

    private final ActivityService activityService;
    private final CodeExecutionService codeExecutionService;
    private final ProgressService progressService;
    private final UserService userService;
    private final ActivityRepository activityRepository;

    @PostMapping("/{activityId}/code/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<CodeExecutionResponse> submitCode(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID activityId,
            @RequestBody CodeSubmitRequest request) {

        User user = userService.findById(userDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        com.aktibolms.entity.Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found"));

        // Execute code via Piston API (handled in service)
        CodeExecutionResponse result = codeExecutionService.executeCode(request.getCode(), request.getLanguage());

        // Save submission
        codeExecutionService.saveCodeSubmissionWithUser(user, activity, request.getCode(), request.getLanguage(),
                result.getOutput(), result.getPassed(), result.getExecutionTimeMs());

        return ResponseEntity.ok(result);
    }

    @PostMapping("/{activityId}/quiz/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> submitQuiz(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID activityId,
            @RequestBody QuizSubmitRequest request) {

        User user = userService.findById(userDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        progressService.submitQuiz(userDetails.getId(), activityId, request, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/progress/lesson/{lessonId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ProgressResponse>> getLessonProgress(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID lessonId) {
        List<ProgressResponse> progress = activityService.getProgressForLesson(lessonId, userDetails.getId());
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/progress/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ProgressResponse>> getCourseProgress(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable UUID courseId) {
        List<ProgressResponse> progress = activityService.getProgressForCourse(courseId, userDetails.getId());
        return ResponseEntity.ok(progress);
    }
}
