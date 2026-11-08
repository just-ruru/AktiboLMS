package com.aktibolms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request payload for the standalone code execution endpoint
 * (POST /code/execute). Mirrors the frontend CodeExecutionRequest interface
 * in frontend/src/hooks/useCodeExecution.ts.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionRequest {

    private String code;
    private String language;
    private String stdin;
}
