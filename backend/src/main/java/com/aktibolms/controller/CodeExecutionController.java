package com.aktibolms.controller;

import com.aktibolms.dto.request.CodeExecutionRequest;
import com.aktibolms.dto.response.CodeExecutionResponse;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CodeExecutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeExecutionController {

    private final CodeExecutionService codeExecutionService;

    @GetMapping("/runtimes")
    public ResponseEntity<List<String>> getRuntimes() {
        // Return supported Piston runtimes
        return ResponseEntity.ok(java.util.List.of("python", "javascript", "java", "cpp", "c", "go", "rust", "php", "ruby"));
    }

    /**
     * Standalone code execution (instant feedback in the editor).
     * Frontend calls POST /code/execute via hooks/useCodeExecution.ts.
     */
    @PostMapping("/execute")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CodeExecutionResponse> executeCode(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CodeExecutionRequest request) {
        // userDetails establishes the authenticated caller; execution is stateless
        CodeExecutionResponse result = codeExecutionService.executeCode(request.getCode(), request.getLanguage());
        return ResponseEntity.ok(result);
    }
}
