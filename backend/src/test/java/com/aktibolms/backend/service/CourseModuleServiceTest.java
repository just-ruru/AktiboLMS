package com.aktibolms.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.aktibolms.backend.dto.request.CourseAssignmentRequest;
import com.aktibolms.backend.dto.request.CourseModuleRequest;
import com.aktibolms.backend.dto.request.CourseRequest;
import com.aktibolms.backend.dto.response.CourseAssignmentResponse;
import com.aktibolms.backend.dto.response.CourseModuleResponse;
import com.aktibolms.backend.dto.response.CourseResponse;
import com.aktibolms.backend.entity.Course;
import com.aktibolms.backend.entity.CourseStatus;
import com.aktibolms.backend.entity.Instructor;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.CourseAssignmentRepository;
import com.aktibolms.backend.repository.CourseModuleRepository;
import com.aktibolms.backend.repository.CourseRepository;
import com.aktibolms.backend.repository.InstructorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:course-module-tests;DB_CLOSE_DELAY=-1",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
@Transactional
@DisplayName("Course and module services")
class CourseModuleServiceTest {

    @Autowired
    private CourseService courseService;

    @Autowired
    private CourseModuleService moduleService;

    @Autowired
    private CourseAssignmentService assignmentService;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseModuleRepository moduleRepository;

    @Autowired
    private CourseAssignmentRepository assignmentRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Test
    @DisplayName("course CRUD creates, updates, and archives without hard deletion")
    void courseCrud() {
        CourseResponse created = courseService.createCourse(courseRequest("CS101"));
        assertThat(created.getStatus()).isEqualTo(CourseStatus.DRAFT);
        assertThat(created.getCreatedAt()).isNotNull();

        CourseRequest update = courseRequest("CS101");
        update.setCourseTitle("Updated course");
        update.setStatus(CourseStatus.PUBLISHED);
        CourseResponse updated = courseService.updateCourse(created.getId(), update);
        assertThat(updated.getCourseTitle()).isEqualTo("Updated course");
        assertThat(updated.getStatus()).isEqualTo(CourseStatus.PUBLISHED);

        courseService.archiveCourse(created.getId());
        assertThat(courseRepository.findById(created.getId()).orElseThrow().getStatus())
                .isEqualTo(CourseStatus.ARCHIVED);
        assertThatThrownBy(() -> courseService.getCourseById(created.getId()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("modules are ordered, reject duplicate sequence, and can be archived")
    void moduleCrud() {
        Long courseId = courseService.createCourse(courseRequest("CS102")).getId();
        CourseModuleResponse later = moduleService.createModule(courseId, moduleRequest("Second", 2));
        moduleService.createModule(courseId, moduleRequest("First", 1));

        CourseModuleRequest update = moduleRequest("Updated second", 3);
        update.setPublished(true);
        CourseModuleResponse updated = moduleService.updateModule(courseId, later.getId(), update);
        assertThat(updated.getModuleTitle()).isEqualTo("Updated second");
        assertThat(updated.isPublished()).isTrue();

        List<CourseModuleResponse> modules = moduleService.getModules(courseId);
        assertThat(modules).extracting(CourseModuleResponse::getSequenceOrder).containsExactly(1, 3);

        assertThatThrownBy(() -> moduleService.createModule(courseId, moduleRequest("Duplicate", 3)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("sequence order");

        moduleService.archiveModule(courseId, later.getId());
        assertThat(moduleService.getModules(courseId)).extracting(CourseModuleResponse::getId)
                .doesNotContain(later.getId());
        assertThat(moduleRepository.findById(later.getId()).orElseThrow().isArchived()).isTrue();
    }

    @Test
    @DisplayName("course assignments retain term details and can be removed and reactivated")
    void instructorAssignments() {
        Long courseId = courseService.createCourse(courseRequest("CS103")).getId();
        Instructor instructor = instructorRepository.save(new Instructor(
                "FAC-001", "Alex", "Santos", "alex@example.com", "hashed-password", null));
        CourseAssignmentRequest request = new CourseAssignmentRequest();
        request.setInstructorId(instructor.getId());
        request.setSemester("First");
        request.setAcademicYear("2026-2027");
        request.setRole("Lead");

        CourseAssignmentResponse created = assignmentService.assignInstructor(courseId, request);
        assertThat(assignmentService.getAssignments(courseId)).hasSize(1);
        assertThat(created.getInstructorCode()).isEqualTo("FAC-001");

        assignmentService.removeAssignment(courseId, created.getId());
        assertThat(assignmentService.getAssignments(courseId)).isEmpty();

        CourseAssignmentResponse reactivated = assignmentService.assignInstructor(courseId, request);
        assertThat(reactivated.getId()).isEqualTo(created.getId());
        assertThat(assignmentRepository.findById(created.getId()).orElseThrow().isActive()).isTrue();
    }

    private CourseRequest courseRequest(String code) {
        CourseRequest request = new CourseRequest();
        request.setCourseCode(code);
        request.setCourseTitle("Introduction to computing");
        request.setDescription("Course description");
        request.setUnits(3);
        return request;
    }

    private CourseModuleRequest moduleRequest(String title, int sequenceOrder) {
        CourseModuleRequest request = new CourseModuleRequest();
        request.setModuleTitle(title);
        request.setSequenceOrder(sequenceOrder);
        return request;
    }
}
