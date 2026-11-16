package com.aktibolms.backend.dto.request;

import com.aktibolms.backend.entity.CourseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CourseRequest {

    @NotBlank
    @Size(max = 50)
    private String courseCode;

    @NotBlank
    @Size(max = 200)
    private String courseTitle;

    @Size(max = 2000)
    private String description;

    @NotNull
    @Positive
    private Integer units;

    @NotNull
    private CourseStatus status = CourseStatus.DRAFT;

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }

    public CourseStatus getStatus() { return status; }
    public void setStatus(CourseStatus status) { this.status = status; }
}
