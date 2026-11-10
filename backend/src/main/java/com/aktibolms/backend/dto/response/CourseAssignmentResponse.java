package com.aktibolms.backend.dto.response;

import com.aktibolms.backend.entity.CourseAssignment;
import java.time.LocalDateTime;

public class CourseAssignmentResponse {

    private Long id;
    private Long courseId;
    private Long instructorId;
    private String instructorCode;
    private String semester;
    private String academicYear;
    private String role;
    private boolean isActive;
    private LocalDateTime createdAt;

    public CourseAssignmentResponse() {}

    public CourseAssignmentResponse(CourseAssignment assignment) {
        id = assignment.getId();
        courseId = assignment.getCourse().getId();
        instructorId = assignment.getInstructor().getId();
        instructorCode = assignment.getInstructor().getInstructorId();
        semester = assignment.getSemester();
        academicYear = assignment.getAcademicYear();
        role = assignment.getRole();
        isActive = assignment.isActive();
        createdAt = assignment.getCreatedAt();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }

    public String getInstructorCode() { return instructorCode; }
    public void setInstructorCode(String instructorCode) { this.instructorCode = instructorCode; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
