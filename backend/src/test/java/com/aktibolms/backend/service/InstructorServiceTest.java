package com.aktibolms.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.aktibolms.backend.dto.request.InstructorRequest;
import com.aktibolms.backend.dto.response.InstructorResponse;
import com.aktibolms.backend.entity.Instructor;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.InstructorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

/**
 * Tests for {@link InstructorService}.
 *
 * Uses an embedded database (H2) so no MySQL instance is required to run these tests.
 *
 * Note: Spring Boot 4.1.2 removed {@code @DataJpaTest} and {@code @MockBean}; we use
 * {@code @SpringBootTest} with the {@code test} profile (H2) instead.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
@Transactional
@DisplayName("InstructorService")
class InstructorServiceTest {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private InstructorService instructorService;

    @BeforeEach
    void setUp() {
        instructorService = new InstructorService(instructorRepository, passwordEncoder);
    }

    private InstructorRequest validRequest() {
        InstructorRequest request = new InstructorRequest();
        request.setInstructorId("I2024-001");
        request.setFirstName("Maria");
        request.setLastName("Santos");
        request.setEmail("maria@example.com");
        request.setPassword("password123");
        request.setDescription("BSIT instructor");
        return request;
    }

    @Test
    @DisplayName("createInstructor should persist and return a response without password")
    void createInstructor_success() {
        InstructorResponse response = instructorService.createInstructor(validRequest());

        assertThat(response).isNotNull();
        assertThat(response.getInstructorId()).isEqualTo("I2024-001");
        assertThat(response.getEmail()).isEqualTo("maria@example.com");
        assertThat(response.isActive()).isTrue();
        assertThat(response.getCreatedAt()).isNotNull();
    }

    @Test
    @DisplayName("createInstructor should hash the password before storing")
    void createInstructor_hashesPassword() {
        instructorService.createInstructor(validRequest());

        Instructor saved = instructorRepository.findByEmail("maria@example.com").orElseThrow();
        assertThat(saved.getPassword()).isNotEqualTo("password123");
        assertThat(passwordEncoder.matches("password123", saved.getPassword())).isTrue();
    }

    @Test
    @DisplayName("createInstructor should reject duplicate email")
    void createInstructor_duplicateEmail() {
        instructorService.createInstructor(validRequest());

        InstructorRequest duplicate = validRequest();
        duplicate.setInstructorId("I2024-002"); // different instructorId, same email

        assertThatThrownBy(() -> instructorService.createInstructor(duplicate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("already registered");
    }

    @Test
    @DisplayName("createInstructor should reject duplicate instructorId")
    void createInstructor_duplicateInstructorId() {
        instructorService.createInstructor(validRequest());

        InstructorRequest duplicate = validRequest();
        duplicate.setEmail("different@example.com"); // different email, same instructorId

        assertThatThrownBy(() -> instructorService.createInstructor(duplicate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("already exists");
    }

    @Test
    @DisplayName("getInstructorById should return active instructor")
    void getInstructorById_activeInstructor() {
        Instructor saved = instructorRepository.save(new Instructor(
                "I2024-001", "Maria", "Santos", "maria@example.com",
                passwordEncoder.encode("password123"), "BSIT instructor"
        ));

        InstructorResponse response = instructorService.getInstructorById(saved.getId());

        assertThat(response.getFirstName()).isEqualTo("Maria");
        assertThat(response.isActive()).isTrue();
    }

    @Test
    @DisplayName("getInstructorById should throw when instructor is inactive")
    void getInstructorById_inactiveInstructor() {
        Instructor saved = instructorRepository.save(new Instructor(
                "I2024-001", "Maria", "Santos", "maria@example.com",
                passwordEncoder.encode("password123"), "BSIT instructor"
        ));
        saved.setActive(false);
        instructorRepository.save(saved);

        assertThatThrownBy(() -> instructorService.getInstructorById(saved.getId()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("getInstructorById should throw when instructor does not exist")
    void getInstructorById_notFound() {
        assertThatThrownBy(() -> instructorService.getInstructorById(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("updateInstructor should update profile fields")
    void updateInstructor_success() {
        Instructor saved = instructorRepository.save(new Instructor(
                "I2024-001", "Maria", "Santos", "maria@example.com",
                passwordEncoder.encode("password123"), "BSIT instructor"
        ));

        InstructorRequest update = validRequest();
        update.setFirstName("Juan");
        update.setDescription("Updated description");

        InstructorResponse response = instructorService.updateInstructor(saved.getId(), update);

        assertThat(response.getFirstName()).isEqualTo("Juan");
        assertThat(response.getDescription()).isEqualTo("Updated description");
        assertThat(response.getEmail()).isEqualTo("maria@example.com");
    }

    @Test
    @DisplayName("updateInstructor should re-hash password when a new one is provided")
    void updateInstructor_newPassword() {
        Instructor saved = instructorRepository.save(new Instructor(
                "I2024-001", "Maria", "Santos", "maria@example.com",
                passwordEncoder.encode("oldPassword"), "BSIT instructor"
        ));

        InstructorRequest update = validRequest();
        update.setPassword("newPassword456");

        instructorService.updateInstructor(saved.getId(), update);

        Instructor refreshed = instructorRepository.findById(saved.getId()).orElseThrow();
        assertThat(passwordEncoder.matches("newPassword456", refreshed.getPassword())).isTrue();
        assertThat(passwordEncoder.matches("oldPassword", refreshed.getPassword())).isFalse();
    }

    @Test
    @DisplayName("deactivateInstructor should set isActive to false")
    void deactivateInstructor_success() {
        Instructor saved = instructorRepository.save(new Instructor(
                "I2024-001", "Maria", "Santos", "maria@example.com",
                passwordEncoder.encode("password123"), "BSIT instructor"
        ));

        instructorService.deactivateInstructor(saved.getId());

        Instructor refreshed = instructorRepository.findById(saved.getId()).orElseThrow();
        assertThat(refreshed.isActive()).isFalse();
    }
}
