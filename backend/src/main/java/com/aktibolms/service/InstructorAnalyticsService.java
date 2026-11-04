package com.aktibolms.service;

import com.aktibolms.dto.response.ActivityAnalytics;
import com.aktibolms.dto.response.CourseAnalytics;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.ActivityProgress;
import com.aktibolms.entity.CodeSubmission;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.QuizAttempt;
import com.aktibolms.repository.ActivityProgressRepository;
import com.aktibolms.repository.ActivityRepository;
import com.aktibolms.repository.CodeSubmissionRepository;
import com.aktibolms.repository.EnrollmentRepository;
import com.aktibolms.repository.QuizAttemptRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
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
    private final CodeSubmissionRepository codeSubmissionRepository;
    private final ActivityRepository activityRepository;

    public CourseAnalytics getCourseAnalytics(UUID courseId, UUID instructorId) {
        // Verify instructor owns the course
        // This is simplified; the controller should enforce authorization

        Long totalEnrollments = enrollmentRepository.countByCourseId(courseId);
        Long completedEnrollments = enrollmentRepository.countByCourseIdAndCompletedAtIsNotNull(courseId);

        Double completionRate = totalEnrollments > 0
                ? (double) completedEnrollments / totalEnrollments * 100
                : 0.0;

        // Get activity statistics for this course
        List<ActivityAnalytics> activityStats = getActivityStats(courseId, instructorId);

        // Calculate average score across all activities
        Double avgScore = activityStats.stream()
                .filter(a -> a.getAverageScore() != null)
                .mapToDouble(ActivityAnalytics::getAverageScore)
                .average()
                .orElse(0.0);

        CourseAnalytics analytics = CourseAnalytics.builder()
                .courseId(courseId)
                .totalEnrollments(totalEnrollments.intValue())
                .completionRate(completionRate.intValue())
                .averageScore(avgScore.intValue())
                .activityStats(activityStats)
                .build();

        return analytics;
    }

    public List<ActivityAnalytics> getActivityStats(UUID courseId, UUID instructorId) {
        // Get all activities for this course with their lessons (avoids N+1 for lesson access)
        List<Activity> activities = activityRepository.findByCourseIdWithLesson(courseId);

        if (activities.isEmpty()) {
            return List.of();
        }

        // Extract all activity IDs for bulk queries
        List<UUID> activityIds = activities.stream().map(Activity::getId).toList();

        // Fetch all progress records in one query
        List<ActivityProgress> allProgresses = progressRepository.findByActivityIdIn(activityIds);

        // Fetch all quiz attempts in one query
        List<QuizAttempt> allQuizAttempts = quizAttemptRepository.findByActivityIdInOrderByCreatedAtDesc(activityIds);

        // Fetch all code submissions in one query
        List<CodeSubmission> allCodeSubmissions = codeSubmissionRepository.findByActivityIdInOrderByCreatedAtDesc(activityIds);

        // Group by activityId for efficient lookup
        Map<UUID, List<ActivityProgress>> progressesByActivity = allProgresses.stream()
                .collect(Collectors.groupingBy(p -> p.getActivity().getId()));

        Map<UUID, List<QuizAttempt>> quizAttemptsByActivity = allQuizAttempts.stream()
                .collect(Collectors.groupingBy(q -> q.getActivity().getId()));

        Map<UUID, List<CodeSubmission>> codeSubmissionsByActivity = allCodeSubmissions.stream()
                .collect(Collectors.groupingBy(c -> c.getActivity().getId()));

        return activities.stream().map(activity -> {
            UUID activityId = activity.getId();

            // Get progress records for this activity (already grouped)
            List<ActivityProgress> progresses = progressesByActivity.getOrDefault(activityId, List.of());

            int totalSubmissions = progresses.size();
            int completed = (int) progresses.stream()
                    .filter(p -> p.getStatus() == ActivityProgress.Status.COMPLETED)
                    .count();

            // Calculate average score
            Double averageScore = progresses.stream()
                    .filter(p -> p.getScore() != null)
                    .mapToDouble(ActivityProgress::getScore)
                    .average()
                    .orElse(0.0);

            // Get quiz attempts for this activity
            List<QuizAttempt> quizAttempts = quizAttemptsByActivity.getOrDefault(activityId, List.of());
            int totalQuizAttempts = quizAttempts.size();
            int passedQuizAttempts = (int) quizAttempts.stream()
                    .filter(QuizAttempt::getPassed)
                    .count();

            // Get code submissions for this activity
            List<CodeSubmission> codeSubmissions = codeSubmissionsByActivity.getOrDefault(activityId, List.of());
            int totalCodeSubmissions = codeSubmissions.size();
            int passedCodeSubmissions = (int) codeSubmissions.stream()
                    .filter(CodeSubmission::getPassed)
                    .count();

            int attempts = totalQuizAttempts + totalCodeSubmissions;

            // Use already fetched lesson (JOIN FETCH)
            String lessonTitle = activity.getLesson() != null ? activity.getLesson().getTitle() : "Unknown Lesson";

            return ActivityAnalytics.builder()
                    .activityId(activityId)
                    .activityTitle(lessonTitle + " - " + activity.getType().name())
                    .activityType(activity.getType().name())
                    .attempts(attempts)
                    .completions(completed)
                    .averageScore(averageScore)
                    .commonFailures(List.of())
                    .build();
        }).collect(Collectors.toList());
    }
}
