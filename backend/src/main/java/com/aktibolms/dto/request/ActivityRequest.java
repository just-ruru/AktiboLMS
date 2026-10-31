package com.aktibolms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {

    @NotNull(message = "Type is required")
    private String type; // CODE_EXERCISE, QUIZ

    @NotNull(message = "Config is required")
    private Object config;

    @NotNull(message = "Order index is required")
    private Integer orderIndex;

    private Integer points;
}
