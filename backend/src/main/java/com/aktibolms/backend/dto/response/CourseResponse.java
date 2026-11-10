package com.aktibolms.backend.dto.response;

import com.aktibolms.backend.entity.Course;
import com.aktibolms.backend.entity.CourseStatus;
import java.time.LocalDateTime;

public class CourseResponse {

    private Long id;
    private String courseCode;
    private String courseTitle;
    private String description;
    private Integer units;
    private CourseStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CourseResponse() {}

    public CourseResponse(Course course) {
        id = course.getId();
        courseCode = course.getCourseCode();
        courseTitle = course.getCourseTitle();
        description = course.getDescription();
        units = course.getUnits();
        status = course.getStatus();
        createdAt = course.getCreatedAt();
        updatedAt = course.getUpdatedAt();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
