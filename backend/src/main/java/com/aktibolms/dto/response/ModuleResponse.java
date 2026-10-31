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
public class ModuleResponse {

    private UUID id;
    private String title;
    private String description;
    private Integer orderIndex;
    private Integer lessonCount;
    private LocalDateTime createdAt;
    private List<LessonResponse> lessons;
}
