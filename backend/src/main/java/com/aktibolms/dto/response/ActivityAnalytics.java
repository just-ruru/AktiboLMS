package com.aktibolms.dto.response;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityAnalytics {

    private UUID activityId;
    private String activityTitle;
    private String activityType;
    private Integer attempts;
    private Integer completions;
    private Double averageScore;
    private List<String> commonFailures;
}
