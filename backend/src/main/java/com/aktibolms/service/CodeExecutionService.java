package com.aktibolms.service;

import com.aktibolms.dto.response.CodeExecutionResponse;
import com.aktibolms.entity.Activity;
import com.aktibolms.entity.CodeSubmission;
import com.aktibolms.entity.User;
import com.aktibolms.repository.ActivityRepository;
import com.aktibolms.repository.CodeSubmissionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CodeExecutionService {

    private final CodeSubmissionRepository codeSubmissionRepository;
    private final ActivityRepository activityRepository;
    private final ObjectMapper objectMapper;

    @Value("${piston.api-url:https://emkc.org/api/v2/piston}")
    private String pistonApiUrl;

    @Value("${piston.timeout:30000}")
    private int pistonTimeout;

    public CodeExecutionResponse executeCode(String code, String language) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {

            HttpPost post = new HttpPost(pistonApiUrl + "/execute");

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("language", language);
            requestBody.put("source", code);
            requestBody.put("stdin", "");

            String json = objectMapper.writeValueAsString(requestBody);
            post.setEntity(new org.apache.hc.core5.http.io.entity.StringEntity(json, ContentType.APPLICATION_JSON));

            try (CloseableHttpResponse response = httpClient.execute(post)) {
                String responseBody = EntityUtils.toString(response.getEntity());

                @SuppressWarnings("unchecked")
                Map<String, Object> pistonResponse = objectMapper.readValue(responseBody, Map.class);

                @SuppressWarnings("unchecked")
                Map<String, Object> run = (Map<String, Object>) pistonResponse.get("run");

                String output = (String) run.getOrDefault("output", "");
                String stderr = (String) run.getOrDefault("stderr", "");
                Number exitCodeNum = (Number) run.getOrDefault("exit_code", 1);
                Integer exitCode = exitCodeNum.intValue();
                String errors = (String) run.getOrDefault("errors", null);

                String combinedError = null;
                if (stderr != null && !stderr.isBlank()) {
                    combinedError = stderr;
                }
                if (errors != null && !errors.isBlank()) {
                    combinedError = (combinedError != null ? combinedError + "\n" : "") + errors;
                }

                Boolean passed = exitCode == 0 && combinedError == null;

                return CodeExecutionResponse.builder()
                        .output(output)
                        .error(combinedError)
                        .executionTimeMs(0L)
                        .exitCode(exitCode)
                        .passed(passed)
                        .build();
            }

        } catch (Exception e) {
            log.error("Piston API execution failed", e);
            return CodeExecutionResponse.builder()
                    .output("")
                    .error("Execution failed: " + e.getMessage())
                    .executionTimeMs(0L)
                    .exitCode(-1)
                    .passed(false)
                    .build();
        }
    }

    public CodeSubmission saveCodeSubmissionWithUser(User user, Activity activity, String code, String language,
                                                      String output, Boolean passed, Long executionTimeMs) {
        CodeSubmission submission = CodeSubmission.builder()
                .id(UUID.randomUUID())
                .user(user)
                .activity(activity)
                .code(code)
                .language(language)
                .output(output)
                .passed(passed)
                .executionTimeMs(executionTimeMs)
                .build();

        return codeSubmissionRepository.save(submission);
    }
}
