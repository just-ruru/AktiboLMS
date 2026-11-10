package com.aktibolms.backend.dto.response;

import com.aktibolms.backend.entity.CourseModule;
import java.time.LocalDateTime;

public class CourseModuleResponse {

    private Long id;
    private Long courseId;
    private String moduleTitle;
    private Integer sequenceOrder;
    private boolean isPublished;
    private boolean isArchived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CourseModuleResponse() {}

    public CourseModuleResponse(CourseModule module) {
        id = module.getId();
        courseId = module.getCourse().getId();
        moduleTitle = module.getModuleTitle();
        sequenceOrder = module.getSequenceOrder();
        isPublished = module.isPublished();
        isArchived = module.isArchived();
        createdAt = module.getCreatedAt();
        updatedAt = module.getUpdatedAt();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getModuleTitle() { return moduleTitle; }
    public void setModuleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; }

    public Integer getSequenceOrder() { return sequenceOrder; }
    public void setSequenceOrder(Integer sequenceOrder) { this.sequenceOrder = sequenceOrder; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }

    public boolean isArchived() { return isArchived; }
    public void setArchived(boolean archived) { isArchived = archived; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
