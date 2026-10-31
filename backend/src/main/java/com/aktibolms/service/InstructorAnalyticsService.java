package com.aktibolms.service;

import com.aktibolms.dto.response.ActivityAnalytics;
import com.aktibolms.dto.response.CourseAnalytics;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.Activity;
import com.aktibolms.repository.ActivityProgressRepository;
import com.aktibolms.repository.EnrollmentRepository;
import com.aktibolms.repository.QuizAttemptRepository;
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
@Transactional(readOnly = true)
public class InstructorAnalyticsService {

    private final EnrollmentRepository enrollmentRepository;
    private final ActivityProgressRepository progressRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public CourseAnalytics getCourseAnalytics(UUID courseId, UUID instructorId) {
        // Verify instructor owns the course
        // This is simplified; the controller should enforce authorization

        Long totalEnrollments = enrollmentRepository.countByCourseId(courseId);
        Long completedEnrollments = enrollmentRepository.countByCourseIdAndCompletedAtIsNotNull(courseId);

        Double completionRate = totalEnrollments > 0
                ? (double) completedEnrollments / totalEnrollments * 100
                : 0.0;

        CourseAnalytics analytics = CourseAnalytics.builder()
                .courseId(courseId)
                .totalEnrollments(totalEnrollments.intValue())
                .completionRate(completionRate.intValue())
                .averageScore(0)
                .activityStats(List.of())
                .build();

        return analytics;
    }
}
