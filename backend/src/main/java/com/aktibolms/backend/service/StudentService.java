package com.aktibolms.backend.service;

import com.aktibolms.backend.dto.request.StudentRequest;
import com.aktibolms.backend.dto.response.StudentResponse;
import com.aktibolms.backend.entity.Student;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Business logic for Student CRUD operations.
 *
 * All methods are read-only or transactional as appropriate. Passwords are hashed
 * with BCrypt before being stored.
 */
@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository, BCryptPasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Create a new student account.
     */
    public StudentResponse createStudent(StudentRequest request) {
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + request.getEmail());
        }
        if (studentRepository.existsByStudentId(request.getStudentId())) {
            throw new IllegalArgumentException("Student ID already exists: " + request.getStudentId());
        }

        Student student = new Student(
                request.getStudentId(),
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getDescription()
        );

        Student saved = studentRepository.save(student);
        return new StudentResponse(saved);
    }

    /**
     * Get a student by ID (only active students).
     */
    @Transactional(readOnly = true)
    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .filter(Student::isActive)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found with id: " + id));
        return new StudentResponse(student);
    }

    /**
     * Get all active students, paginated.
     */
    @Transactional(readOnly = true)
    public Page<StudentResponse> getAllStudents(Pageable pageable) {
        return studentRepository.findByIsActiveTrue(pageable)
                .map(StudentResponse::new);
    }

    /**
     * Update an existing student's profile. Only active students can be updated.
     * The studentId and email cannot be changed here — use dedicated endpoints if needed.
     */
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .filter(Student::isActive)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found with id: " + id));

        // Check email uniqueness if changing email
        if (!student.getEmail().equals(request.getEmail())) {
            if (studentRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Email already registered: " + request.getEmail());
            }
        }

        // Check studentId uniqueness if changing
        if (!student.getStudentId().equals(request.getStudentId())) {
            if (studentRepository.existsByStudentId(request.getStudentId())) {
                throw new IllegalArgumentException("Student ID already exists: " + request.getStudentId());
            }
        }

        student.setStudentId(request.getStudentId());
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setDescription(request.getDescription());

        // Only re-hash password if a new one is provided
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            student.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        Student saved = studentRepository.save(student);
        return new StudentResponse(saved);
    }

    /**
     * Deactivate (soft delete) a student account. Sets isActive = false.
     */
    public void deactivateStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found with id: " + id));

        student.setActive(false);
        studentRepository.save(student);
    }
}
