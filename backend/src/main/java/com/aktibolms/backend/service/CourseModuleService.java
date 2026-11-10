package com.aktibolms.backend.service;

import com.aktibolms.backend.dto.request.CourseModuleRequest;
import com.aktibolms.backend.dto.response.CourseModuleResponse;
import com.aktibolms.backend.entity.Course;
import com.aktibolms.backend.entity.CourseModule;
import com.aktibolms.backend.entity.CourseStatus;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.CourseModuleRepository;
import com.aktibolms.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CourseModuleService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;

    public CourseModuleService(CourseRepository courseRepository, CourseModuleRepository moduleRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
    }

    public CourseModuleResponse createModule(Long courseId, CourseModuleRequest request) {
        Course course = findAvailableCourse(courseId);
        ensureSequenceAvailable(courseId, request.getSequenceOrder(), null);

        CourseModule module = new CourseModule();
        module.setCourse(course);
        applyRequest(module, request);
        return new CourseModuleResponse(moduleRepository.save(module));
    }

    @Transactional(readOnly = true)
    public List<CourseModuleResponse> getModules(Long courseId) {
        findAvailableCourse(courseId);
        return moduleRepository.findByCourseIdAndIsArchivedFalseOrderBySequenceOrderAsc(courseId)
                .stream()
                .map(CourseModuleResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseModuleResponse getModule(Long courseId, Long moduleId) {
        findAvailableCourse(courseId);
        return new CourseModuleResponse(findAvailableModule(courseId, moduleId));
    }

    public CourseModuleResponse updateModule(Long courseId, Long moduleId, CourseModuleRequest request) {
        findAvailableCourse(courseId);
        CourseModule module = findAvailableModule(courseId, moduleId);
        ensureSequenceAvailable(courseId, request.getSequenceOrder(), moduleId);

        applyRequest(module, request);
        return new CourseModuleResponse(moduleRepository.save(module));
    }

    public void archiveModule(Long courseId, Long moduleId) {
        findAvailableCourse(courseId);
        CourseModule module = findAvailableModule(courseId, moduleId);
        module.setPublished(false);
        module.setArchived(true);
        moduleRepository.save(module);
    }

    private Course findAvailableCourse(Long courseId) {
        return courseRepository.findById(courseId)
                .filter(course -> course.getStatus() != CourseStatus.ARCHIVED)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
    }

    private CourseModule findAvailableModule(Long courseId, Long moduleId) {
        return moduleRepository.findByIdAndCourseIdAndIsArchivedFalse(moduleId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Module not found with id: " + moduleId + " in course: " + courseId));
    }

    private void ensureSequenceAvailable(Long courseId, Integer sequenceOrder, Long currentModuleId) {
        boolean exists = currentModuleId == null
                ? moduleRepository.existsByCourseIdAndSequenceOrder(courseId, sequenceOrder)
                : moduleRepository.existsByCourseIdAndSequenceOrderAndIdNot(courseId, sequenceOrder, currentModuleId);
        if (exists) {
            throw new IllegalArgumentException(
                    "Module sequence order already exists in course " + courseId + ": " + sequenceOrder);
        }
    }

    private void applyRequest(CourseModule module, CourseModuleRequest request) {
        module.setModuleTitle(request.getModuleTitle());
        module.setSequenceOrder(request.getSequenceOrder());
        module.setPublished(request.isPublished());
    }
}
