package com.aktibolms.dto.response;

import java.time.LocalDateTime;
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
public class CourseAnalytics {

    private UUID courseId;
    private Integer totalEnrollments;
    private Integer completionRate;
    private Integer averageScore;
    private List<ActivityAnalytics> activityStats;
}
