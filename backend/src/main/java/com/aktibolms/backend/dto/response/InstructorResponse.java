package com.aktibolms.backend.dto.response;

import com.aktibolms.backend.entity.Instructor;
import java.time.LocalDateTime;

/**
 * Response payload for Instructor data. Never includes the password.
 */
public class InstructorResponse {

    private Long id;
    private String instructorId;
    private String firstName;
    private String lastName;
    private String email;
    private String description;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public InstructorResponse() {}

    public InstructorResponse(Instructor instructor) {
        this.id = instructor.getId();
        this.instructorId = instructor.getInstructorId();
        this.firstName = instructor.getFirstName();
        this.lastName = instructor.getLastName();
        this.email = instructor.getEmail();
        this.description = instructor.getDescription();
        this.isActive = instructor.isActive();
        this.createdAt = instructor.getCreatedAt();
        this.updatedAt = instructor.getUpdatedAt();
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInstructorId() { return instructorId; }
    public void setInstructorId(String instructorId) { this.instructorId = instructorId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
