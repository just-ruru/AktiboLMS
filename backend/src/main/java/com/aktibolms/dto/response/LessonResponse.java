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
public class LessonResponse {

    private UUID id;
    private String title;
    private String description;
    private Integer orderIndex;
    private UUID moduleId;
    private List<ContentBlockResponse> contentBlocks;
    private List<ActivityResponse> activities;
    private LocalDateTime createdAt;
}
