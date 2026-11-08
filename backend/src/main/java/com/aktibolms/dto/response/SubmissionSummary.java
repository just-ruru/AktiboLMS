package com.aktibolms.dto.response;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.UUID;

@Value
@Builder
public class SubmissionSummary {
    UUID id;
    UUID userId;
    String userEmail;
    String userFullName;
    String activityType; // "code_exercise" or "quiz"
    String language; // for code exercises
    Integer score;
    Boolean passed;
    LocalDateTime createdAt;
}
