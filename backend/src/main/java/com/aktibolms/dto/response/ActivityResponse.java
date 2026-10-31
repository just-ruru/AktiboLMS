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
public class ActivityResponse {

    private UUID id;
    private String type;
    private Object config;
    private Integer orderIndex;
    private Integer points;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
