package com.aktibolms.controller;

import com.aktibolms.dto.response.CodeExecutionResponse;
import com.aktibolms.security.CustomUserDetails;
import com.aktibolms.service.CodeExecutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeExecutionController {

    private final CodeExecutionService codeExecutionService;

    @PostMapping("/execute")
    public ResponseEntity<CodeExecutionResponse> executeCode(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        String language = request.get("language");

        CodeExecutionResponse result = codeExecutionService.executeCode(code, language);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/runtimes")
    public ResponseEntity<List<String>> getRuntimes() {
        // Return supported Piston runtimes
        return ResponseEntity.ok(java.util.List.of("python", "javascript", "java", "cpp", "c", "go", "rust", "php", "ruby"));
    }
}
