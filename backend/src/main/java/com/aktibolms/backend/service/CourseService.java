package com.aktibolms.backend.service;

import com.aktibolms.backend.dto.request.CourseRequest;
import com.aktibolms.backend.dto.response.CourseResponse;
import com.aktibolms.backend.entity.Course;
import com.aktibolms.backend.entity.CourseStatus;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.CourseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseResponse createCourse(CourseRequest request) {
        if (courseRepository.existsByCourseCode(request.getCourseCode())) {
            throw new IllegalArgumentException("Course code already exists: " + request.getCourseCode());
        }

        Course course = new Course();
        applyRequest(course, request);
        return new CourseResponse(courseRepository.save(course));
    }

    @Transactional(readOnly = true)
    public CourseResponse getCourseById(Long id) {
        return new CourseResponse(findAvailableCourse(id));
    }

    @Transactional(readOnly = true)
    public Page<CourseResponse> getAllCourses(Pageable pageable) {
        return courseRepository.findByStatusNot(CourseStatus.ARCHIVED, pageable)
                .map(CourseResponse::new);
    }

    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = findAvailableCourse(id);
        if (!course.getCourseCode().equals(request.getCourseCode())
                && courseRepository.existsByCourseCode(request.getCourseCode())) {
            throw new IllegalArgumentException("Course code already exists: " + request.getCourseCode());
        }

        applyRequest(course, request);
        return new CourseResponse(courseRepository.save(course));
    }

    public void archiveCourse(Long id) {
        Course course = findAvailableCourse(id);
        course.setStatus(CourseStatus.ARCHIVED);
        courseRepository.save(course);
    }

    Course findAvailableCourse(Long id) {
        return courseRepository.findById(id)
                .filter(course -> course.getStatus() != CourseStatus.ARCHIVED)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    private void applyRequest(Course course, CourseRequest request) {
        course.setCourseCode(request.getCourseCode());
        course.setCourseTitle(request.getCourseTitle());
        course.setDescription(request.getDescription());
        course.setUnits(request.getUnits());
        course.setStatus(request.getStatus());
    }
}
