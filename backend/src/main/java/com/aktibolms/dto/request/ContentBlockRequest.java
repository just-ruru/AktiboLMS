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
public class ContentBlockRequest {

    @NotNull(message = "Type is required")
    private String type; // TEXT, VIDEO, IMAGE, CODE_SNIPPET

    @NotNull(message = "Content is required")
    private Object content;

    @NotNull(message = "Order index is required")
    private Integer orderIndex;
}
