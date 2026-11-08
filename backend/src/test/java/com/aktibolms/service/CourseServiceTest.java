package com.aktibolms.service;

import com.aktibolms.dto.request.CourseRequest;
import com.aktibolms.entity.Course;
import com.aktibolms.entity.Module;
import com.aktibolms.entity.User;
import com.aktibolms.repository.CourseRepository;
import com.aktibolms.repository.EnrollmentRepository;
import com.aktibolms.repository.LessonRepository;
import com.aktibolms.repository.ModuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageImpl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private ModuleRepository moduleRepository;

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private EnrollmentRepository enrollmentRepository;

    @InjectMocks
    private CourseService courseService;

    private UUID testInstructorId;
    private UUID testCourseId;
    private User testInstructor;
    private Course testCourse;
    private CourseRequest courseRequest;

    @BeforeEach
    void setUp() {
        testInstructorId = UUID.randomUUID();
        testCourseId = UUID.randomUUID();
        testInstructor = User.builder()
                .id(testInstructorId)
                .email("instructor@example.com")
                .password("password")
                .fullName("Instructor User")
                .role(User.Role.INSTRUCTOR)
                .build();

        testCourse = Course.builder()
                .id(testCourseId)
                .title("Test Course")
                .description("A test course")
                .instructor(testInstructor)
                .published(false)
                .build();

        courseRequest = new CourseRequest();
        courseRequest.setTitle("New Course");
        courseRequest.setDescription("A new course");
        courseRequest.setThumbnailUrl("https://example.com/thumb.jpg");
    }

    @Test
    void createCourse_shouldSucceed_whenValidRequest() {
        // Given
        when(courseRepository.save(any(Course.class))).thenAnswer(invocation -> {
            Course c = invocation.getArgument(0);
            c.setId(testCourseId);
            return c;
        });

        // When
        Course result = courseService.createCourse(testCourse, testInstructor);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getInstructor()).isEqualTo(testInstructor);
        assertThat(result.getPublished()).isFalse();
        verify(courseRepository).save(any(Course.class));
    }

    @Test
    void updateCourse_shouldSucceed_whenOwner() {
        // Given
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(testCourse);

        Course updates = Course.builder()
                .title("Updated Title")
                .description("Updated description")
                .build();

        // When
        Course result = courseService.updateCourse(testCourseId, updates, testInstructorId);

        // Then
        assertThat(result.getTitle()).isEqualTo("Updated Title");
        assertThat(result.getDescription()).isEqualTo("Updated description");
    }

    @Test
    void updateCourse_shouldThrow_whenNotOwner() {
        // Given
        User otherInstructor = User.builder()
                .id(UUID.randomUUID())
                .email("other@example.com")
                .role(User.Role.INSTRUCTOR)
                .build();
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));

        Course updates = Course.builder()
                .title("Updated Title")
                .build();

        // When / Then
        assertThatThrownBy(() -> courseService.updateCourse(testCourseId, updates, otherInstructor.getId()))
                .isInstanceOf(java.lang.SecurityException.class)
                .hasMessage("Not authorized to update this course");
    }

    @Test
    void deleteCourse_shouldSucceed_whenOwner() {
        // Given
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));

        // When
        courseService.deleteCourse(testCourseId, testInstructorId);

        // Then
        verify(courseRepository).delete(testCourse);
    }

    @Test
    void deleteCourse_shouldThrow_whenNotOwner() {
        // Given
        User otherInstructor = User.builder()
                .id(UUID.randomUUID())
                .email("other@example.com")
                .role(User.Role.INSTRUCTOR)
                .build();
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));

        // When / Then
        assertThatThrownBy(() -> courseService.deleteCourse(testCourseId, otherInstructor.getId()))
                .isInstanceOf(java.lang.SecurityException.class)
                .hasMessage("Not authorized to delete this course");
    }

    @Test
    void publishCourse_shouldSucceed_whenOwner() {
        // Given
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(testCourse);

        // When
        Course result = courseService.publishCourse(testCourseId, testInstructorId);

        // Then
        assertThat(result.getPublished()).isTrue();
    }

    @Test
    void unpublishCourse_shouldSucceed_whenOwner() {
        // Given
        testCourse.setPublished(true);
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(testCourse);

        // When
        Course result = courseService.unpublishCourse(testCourseId, testInstructorId);

        // Then
        assertThat(result.getPublished()).isFalse();
    }

    @Test
    void getMyCourses_shouldReturnInstructorsCourses() {
        // Given
        when(courseRepository.findByInstructorId(testInstructorId)).thenReturn(List.of(testCourse));

        // When
        List<Course> result = courseService.getMyCourses(testInstructorId);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(testCourseId);
    }

    @Test
    void getPublishedCourses_shouldReturnPublished() {
        // Given
        org.springframework.data.domain.Page<Course> page = new org.springframework.data.domain.PageImpl<>(List.of(testCourse));
        when(courseRepository.findByPublishedTrue(any())).thenReturn(page);

        // When
        var result = courseService.getPublishedCourses(org.springframework.data.domain.Pageable.unpaged());

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.getContent().get(0).getId()).isEqualTo(testCourseId);
    }

    @Test
    void createModule_shouldSucceed_whenCourseOwner() {
        // Given
        Module testModule = Module.builder()
                .id(UUID.randomUUID())
                .title("Module 1")
                .build();
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));
        when(moduleRepository.save(any(Module.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // When
        Module result = courseService.createModule(testCourseId, testModule, testInstructorId);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCourse()).isEqualTo(testCourse);
    }

    @Test
    void createModule_shouldThrow_whenNotCourseOwner() {
        // Given
        User otherInstructor = User.builder()
                .id(UUID.randomUUID())
                .email("other@example.com")
                .role(User.Role.INSTRUCTOR)
                .build();
        when(courseRepository.findById(testCourseId)).thenReturn(Optional.of(testCourse));

        Module testModule = Module.builder()
                .id(UUID.randomUUID())
                .title("Module 1")
                .build();

        // When / Then
        assertThatThrownBy(() -> courseService.createModule(testCourseId, testModule, otherInstructor.getId()))
                .isInstanceOf(java.lang.SecurityException.class)
                .hasMessage("Not authorized to add modules to this course");
    }
}
