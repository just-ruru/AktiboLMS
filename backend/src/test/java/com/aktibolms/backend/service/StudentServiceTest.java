package com.aktibolms.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.aktibolms.backend.dto.request.StudentRequest;
import com.aktibolms.backend.dto.response.StudentResponse;
import com.aktibolms.backend.entity.Student;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

/**
 * Tests for {@link StudentService}.
 *
 * Uses an embedded database (H2) so no MySQL instance is required to run these tests.
 *
 * Note: Spring Boot 4.1.2 removed {@code @DataJpaTest} and {@code @MockBean}; we use
 * {@code @SpringBootTest} with the {@code test} profile (H2) instead.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
@Transactional
@DisplayName("StudentService")
class StudentServiceTest {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentService = new StudentService(studentRepository, passwordEncoder);
    }

    private StudentRequest validRequest() {
        StudentRequest request = new StudentRequest();
        request.setStudentId("S2024-001");
        request.setFirstName("Juan");
        request.setLastName("Dela Cruz");
        request.setEmail("juan@example.com");
        request.setPassword("password123");
        request.setDescription("BSIT student");
        return request;
    }

    @Test
    @DisplayName("createStudent should persist and return a response without password")
    void createStudent_success() {
        StudentResponse response = studentService.createStudent(validRequest());

        assertThat(response).isNotNull();
        assertThat(response.getStudentId()).isEqualTo("S2024-001");
        assertThat(response.getEmail()).isEqualTo("juan@example.com");
        assertThat(response.isActive()).isTrue();
        assertThat(response.getCreatedAt()).isNotNull();
    }

    @Test
    @DisplayName("createStudent should hash the password before storing")
    void createStudent_hashesPassword() {
        studentService.createStudent(validRequest());

        Student saved = studentRepository.findByEmail("juan@example.com").orElseThrow();
        assertThat(saved.getPassword()).isNotEqualTo("password123");
        assertThat(passwordEncoder.matches("password123", saved.getPassword())).isTrue();
    }

    @Test
    @DisplayName("createStudent should reject duplicate email")
    void createStudent_duplicateEmail() {
        studentService.createStudent(validRequest());

        StudentRequest duplicate = validRequest();
        duplicate.setStudentId("S2024-002"); // different studentId, same email

        assertThatThrownBy(() -> studentService.createStudent(duplicate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("already registered");
    }

    @Test
    @DisplayName("createStudent should reject duplicate studentId")
    void createStudent_duplicateStudentId() {
        studentService.createStudent(validRequest());

        StudentRequest duplicate = validRequest();
        duplicate.setEmail("different@example.com"); // different email, same studentId

        assertThatThrownBy(() -> studentService.createStudent(duplicate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("already exists");
    }

    @Test
    @DisplayName("getStudentById should return active student")
    void getStudentById_activeStudent() {
        Student saved = studentRepository.save(new Student(
                "S2024-001", "Juan", "Dela Cruz", "juan@example.com",
                passwordEncoder.encode("password123"), "BSIT student"
        ));

        StudentResponse response = studentService.getStudentById(saved.getId());

        assertThat(response.getFirstName()).isEqualTo("Juan");
        assertThat(response.isActive()).isTrue();
    }

    @Test
    @DisplayName("getStudentById should throw when student is inactive")
    void getStudentById_inactiveStudent() {
        Student saved = studentRepository.save(new Student(
                "S2024-001", "Juan", "Dela Cruz", "juan@example.com",
                passwordEncoder.encode("password123"), "BSIT student"
        ));
        saved.setActive(false);
        studentRepository.save(saved);

        assertThatThrownBy(() -> studentService.getStudentById(saved.getId()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("getStudentById should throw when student does not exist")
    void getStudentById_notFound() {
        assertThatThrownBy(() -> studentService.getStudentById(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("updateStudent should update profile fields")
    void updateStudent_success() {
        Student saved = studentRepository.save(new Student(
                "S2024-001", "Juan", "Dela Cruz", "juan@example.com",
                passwordEncoder.encode("password123"), "BSIT student"
        ));

        StudentRequest update = validRequest();
        update.setFirstName("Maria");
        update.setDescription("Updated description");

        StudentResponse response = studentService.updateStudent(saved.getId(), update);

        assertThat(response.getFirstName()).isEqualTo("Maria");
        assertThat(response.getDescription()).isEqualTo("Updated description");
        assertThat(response.getEmail()).isEqualTo("juan@example.com");
    }

    @Test
    @DisplayName("updateStudent should re-hash password when a new one is provided")
    void updateStudent_newPassword() {
        Student saved = studentRepository.save(new Student(
                "S2024-001", "Juan", "Dela Cruz", "juan@example.com",
                passwordEncoder.encode("oldPassword"), "BSIT student"
        ));

        StudentRequest update = validRequest();
        update.setPassword("newPassword456");

        studentService.updateStudent(saved.getId(), update);

        Student refreshed = studentRepository.findById(saved.getId()).orElseThrow();
        assertThat(passwordEncoder.matches("newPassword456", refreshed.getPassword())).isTrue();
        assertThat(passwordEncoder.matches("oldPassword", refreshed.getPassword())).isFalse();
    }

    @Test
    @DisplayName("deactivateStudent should set isActive to false")
    void deactivateStudent_success() {
        Student saved = studentRepository.save(new Student(
                "S2024-001", "Juan", "Dela Cruz", "juan@example.com",
                passwordEncoder.encode("password123"), "BSIT student"
        ));

        studentService.deactivateStudent(saved.getId());

        Student refreshed = studentRepository.findById(saved.getId()).orElseThrow();
        assertThat(refreshed.isActive()).isFalse();
    }
}
