package com.aktibolms.backend.service;

import com.aktibolms.backend.dto.request.InstructorRequest;
import com.aktibolms.backend.dto.response.InstructorResponse;
import com.aktibolms.backend.entity.Instructor;
import com.aktibolms.backend.exception.ResourceNotFoundException;
import com.aktibolms.backend.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for Instructor CRUD operations.
 *
 * All methods are read-only or transactional as appropriate. Passwords are hashed
 * with BCrypt before being stored.
 */
@Service
@Transactional
public class InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * Create a new instructor profile/account.
     */
    public InstructorResponse createInstructor(InstructorRequest request) {
        if (instructorRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + request.getEmail());
        }
        if (instructorRepository.existsByInstructorId(request.getInstructorId())) {
            throw new IllegalArgumentException("Instructor ID already exists: " + request.getInstructorId());
        }

        Instructor instructor = new Instructor(
                request.getInstructorId(),
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getDescription()
        );

        Instructor saved = instructorRepository.save(instructor);
        return new InstructorResponse(saved);
    }

    /**
     * Get an instructor by ID (only active instructors).
     */
    @Transactional(readOnly = true)
    public InstructorResponse getInstructorById(Long id) {
        Instructor instructor = instructorRepository.findById(id)
                .filter(Instructor::isActive)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Instructor not found with id: " + id));
        return new InstructorResponse(instructor);
    }

    /**
     * Get all active instructors.
     */
    @Transactional(readOnly = true)
    public List<InstructorResponse> getAllInstructors() {
        return instructorRepository.findAll().stream()
                .filter(Instructor::isActive)
                .map(InstructorResponse::new)
                .collect(Collectors.toList());
    }

    /**
     * Update an existing instructor's profile. Only active instructors can be updated.
     */
    public InstructorResponse updateInstructor(Long id, InstructorRequest request) {
        Instructor instructor = instructorRepository.findById(id)
                .filter(Instructor::isActive)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Instructor not found with id: " + id));

        if (!instructor.getEmail().equals(request.getEmail())) {
            if (instructorRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Email already registered: " + request.getEmail());
            }
        }

        if (!instructor.getInstructorId().equals(request.getInstructorId())) {
            if (instructorRepository.existsByInstructorId(request.getInstructorId())) {
                throw new IllegalArgumentException("Instructor ID already exists: " + request.getInstructorId());
            }
        }

        instructor.setInstructorId(request.getInstructorId());
        instructor.setFirstName(request.getFirstName());
        instructor.setLastName(request.getLastName());
        instructor.setEmail(request.getEmail());
        instructor.setDescription(request.getDescription());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            instructor.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        Instructor saved = instructorRepository.save(instructor);
        return new InstructorResponse(saved);
    }

    /**
     * Deactivate (soft delete) an instructor account. Sets isActive = false.
     */
    public void deactivateInstructor(Long id) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Instructor not found with id: " + id));

        instructor.setActive(false);
        instructorRepository.save(instructor);
    }
}
