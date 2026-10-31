package com.aktibolms.service;

import com.aktibolms.dto.response.ProgressResponse;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.ActivityProgress;
import com.aktibolms.entity.User;
import com.aktibolms.repository.ActivityProgressRepository;
import com.aktibolms.repository.ActivityRepository;
import com.aktibolms.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityProgressRepository progressRepository;
    private final LessonRepository lessonRepository;

    public Activity createActivity(UUID lessonId, com.aktibolms.dto.request.ActivityRequest request, UUID instructorId) {
        // Verify lesson exists and user owns the course
        // Activity ownership is inferred through lesson -> module -> course -> instructor
        // This is a simplified check; controllers should enforce authorization
        var lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        Activity activity = Activity.builder()
                .id(UUID.randomUUID())
                .lesson(lesson)
                .type(Activity.Type.valueOf(request.getType()))
                .configJson((String) request.getConfig())
                .orderIndex(request.getOrderIndex())
                .points(request.getPoints() != null ? request.getPoints() : 10)
                .build();

        return activityRepository.save(activity);
    }

    public Activity updateActivity(UUID activityId, com.aktibolms.dto.request.ActivityRequest request, UUID instructorId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found"));

        // Authorization check: verify instructor owns the course through lesson -> module -> course
        if (!activity.getLesson().getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to update this activity");
        }

        activity.setType(Activity.Type.valueOf(request.getType()));
        activity.setConfigJson((String) request.getConfig());
        activity.setOrderIndex(request.getOrderIndex());
        if (request.getPoints() != null) {
            activity.setPoints(request.getPoints());
        }

        return activityRepository.save(activity);
    }

    public void deleteActivity(UUID activityId, UUID instructorId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found"));

        if (!activity.getLesson().getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to delete this activity");
        }

        activityRepository.delete(activity);
    }

    @Transactional(readOnly = true)
    public List<ProgressResponse> getProgressForLesson(UUID lessonId, UUID userId) {
        List<ActivityProgress> progressList = progressRepository.findByActivity_LessonIdAndUserId(lessonId, userId);
        return progressList.stream()
                .map(p -> ProgressResponse.builder()
                        .activityId(p.getActivity().getId())
                        .activityType(p.getActivity().getType().name())
                        .status(p.getStatus().name())
                        .score(p.getScore())
                        .submittedAt(p.getSubmittedAt())
                        .completedAt(p.getCompletedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProgressResponse> getProgressForCourse(UUID courseId, UUID userId) {
        List<ActivityProgress> progressList = progressRepository.findByCourseIdAndUserId(courseId, userId);
        return progressList.stream()
                .map(p -> ProgressResponse.builder()
                        .activityId(p.getActivity().getId())
                        .activityType(p.getActivity().getType().name())
                        .status(p.getStatus().name())
                        .score(p.getScore())
                        .submittedAt(p.getSubmittedAt())
                        .completedAt(p.getCompletedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
