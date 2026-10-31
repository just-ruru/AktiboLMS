package com.aktibolms.service;

import com.aktibolms.dto.request.QuizSubmitRequest;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.QuizAttempt;
import com.aktibolms.entity.User;
import com.aktibolms.repository.ActivityRepository;
import com.aktibolms.repository.QuizAttemptRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProgressService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final ActivityRepository activityRepository;
    private final ObjectMapper objectMapper;

    public QuizAttempt submitQuiz(UUID userId, UUID activityId, QuizSubmitRequest request, User user) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found"));

        Integer[] answers = request.getAnswers().toArray(new Integer[0]);

        // Calculate score based on correct answers
        Integer score = 0;
        Integer total = 0;
        String configJson = activity.getConfigJson();
        if (configJson != null && !configJson.isBlank()) {
            try {
                JsonNode configNode = objectMapper.readTree(configJson);
                JsonNode questions = configNode.get("questions");
                if (questions != null && questions.isArray()) {
                    for (int i = 0; i < questions.size(); i++) {
                        total++;
                        Integer correctIndex = questions.get(i).get("correct_index").asInt();
                        if (i < answers.length && answers[i] != null && answers[i].equals(correctIndex)) {
                            score++;
                        }
                    }
                }
            } catch (Exception e) {
                log.error("Failed to parse quiz config", e);
            }
        }

        Integer finalScore = total > 0 ? (score * 100 / total) : 0;
        Boolean passed = finalScore >= 60;

        String answersJson;
        try {
            answersJson = objectMapper.writeValueAsString(answers);
        } catch (Exception e) {
            answersJson = "[]";
        }

        QuizAttempt attempt = QuizAttempt.builder()
                .id(UUID.randomUUID())
                .user(user)
                .activity(activity)
                .answersJson(answersJson)
                .score(finalScore)
                .passed(passed)
                .build();

        return quizAttemptRepository.save(attempt);
    }
}
