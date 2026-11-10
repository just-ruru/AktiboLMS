package com.aktibolms.backend.service;

import com.aktibolms.backend.dto.request.CourseAssignmentRequest;
import com.aktibolms.backend.dto.response.CourseAssignmentResponse;
import com.aktibolms.backend.entity.Course;
import com.aktibolms.backend.entity.CourseAssignment;
import com.aktibolms.backend.entity.CourseStatus;
import com.aktibolms.backend.entity.Instructor;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.CourseAssignmentRepository;
import com.aktibolms.backend.repository.CourseRepository;
import com.aktibolms.backend.repository.InstructorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CourseAssignmentService {

    private final CourseRepository courseRepository;
    private final CourseAssignmentRepository assignmentRepository;
    private final InstructorRepository instructorRepository;

    public CourseAssignmentService(
            CourseRepository courseRepository,
            CourseAssignmentRepository assignmentRepository,
            InstructorRepository instructorRepository) {
        this.courseRepository = courseRepository;
        this.assignmentRepository = assignmentRepository;
        this.instructorRepository = instructorRepository;
    }

    public CourseAssignmentResponse assignInstructor(Long courseId, CourseAssignmentRequest request) {
        Course course = findAvailableCourse(courseId);
        Instructor instructor = instructorRepository.findById(request.getInstructorId())
                .filter(Instructor::isActive)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Active instructor not found with id: " + request.getInstructorId()));

        return assignmentRepository.findByCourseIdAndInstructorIdAndSemesterAndAcademicYear(
                        courseId, instructor.getId(), request.getSemester(), request.getAcademicYear())
                .map(existing -> {
                    if (existing.isActive()) {
                        throw new IllegalArgumentException("Instructor is already assigned to this course for the term");
                    }
                    existing.setActive(true);
                    existing.setRole(request.getRole());
                    return new CourseAssignmentResponse(assignmentRepository.save(existing));
                })
                .orElseGet(() -> {
                    CourseAssignment assignment = new CourseAssignment();
                    assignment.setCourse(course);
                    assignment.setInstructor(instructor);
                    assignment.setSemester(request.getSemester());
                    assignment.setAcademicYear(request.getAcademicYear());
                    assignment.setRole(request.getRole());
                    return new CourseAssignmentResponse(assignmentRepository.save(assignment));
                });
    }

    @Transactional(readOnly = true)
    public List<CourseAssignmentResponse> getAssignments(Long courseId) {
        findAvailableCourse(courseId);
        return assignmentRepository.findByCourseIdAndIsActiveTrueOrderByCreatedAtAsc(courseId)
                .stream()
                .map(CourseAssignmentResponse::new)
                .toList();
    }

    public void removeAssignment(Long courseId, Long assignmentId) {
        findAvailableCourse(courseId);
        CourseAssignment assignment = assignmentRepository
                .findByIdAndCourseIdAndIsActiveTrue(assignmentId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Active course assignment not found with id: " + assignmentId));
        assignment.setActive(false);
        assignmentRepository.save(assignment);
    }

    private Course findAvailableCourse(Long courseId) {
        return courseRepository.findById(courseId)
                .filter(course -> course.getStatus() != CourseStatus.ARCHIVED)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
    }
}
