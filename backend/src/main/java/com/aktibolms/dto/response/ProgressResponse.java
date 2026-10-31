package com.aktibolms.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressResponse {

    private UUID activityId;
    private String activityType;
    private String status;
    private Integer score;
    private LocalDateTime submittedAt;
    private LocalDateTime completedAt;
}
