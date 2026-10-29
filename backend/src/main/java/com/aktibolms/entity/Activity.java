package com.aktibolms.entity;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type;

    @Type(JsonBinaryType.class)
    @Column(name = "config", columnDefinition = "jsonb", nullable = false)
    private Config config;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "points", nullable = false)
    @Builder.Default
    private Integer points = 10;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum Type {
        CODE_EXERCISE, QUIZ
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Config {
        // Code exercise config
        private String language;
        private String starterCode;
        private String solutionCode;
        private TestCase[] testCases;

        // Quiz config
        private QuizQuestion[] questions;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TestCase {
        private String input;
        private String expectedOutput;
        private Boolean hidden;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuizQuestion {
        private String id;
        private String question;
        private String[] options;
        private Integer correctIndex;
        private String explanation;
    }
}