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
public class CourseResponse {

    private UUID id;
    private String title;
    private String description;
    private String thumbnailUrl;
    private String instructorId;
    private String instructorName;
    private Boolean published;
    private Integer moduleCount;
    private Integer enrolledCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ModuleResponse> modules;
}
