package com.aktibolms.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CourseAssignmentRequest {

    @NotNull
    @Positive
    private Long instructorId;

    @NotBlank
    @Size(max = 50)
    private String semester;

    @NotBlank
    @Size(max = 20)
    private String academicYear;

    @NotBlank
    @Size(max = 50)
    private String role;

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
