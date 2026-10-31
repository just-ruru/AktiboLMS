package com.aktibolms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionResponse {

    private String output;
    private String error;
    private Long executionTimeMs;
    private Integer exitCode;
    private Boolean passed;
}
