package com.aktibolms.service;

import com.aktibolms.entity.Course;
import com.aktibolms.entity.Module;
import com.aktibolms.entity.User;
import com.aktibolms.repository.CourseRepository;
import com.aktibolms.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;

    public Course createCourse(Course course, User instructor) {
        course.setInstructor(instructor);
        course.setPublished(false);
        return courseRepository.save(course);
    }

    public Course updateCourse(UUID courseId, Course updates, UUID instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to update this course");
        }
        
        course.setTitle(updates.getTitle());
        course.setDescription(updates.getDescription());
        course.setThumbnailUrl(updates.getThumbnailUrl());
        return courseRepository.save(course);
    }

    public void deleteCourse(UUID courseId, UUID instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to delete this course");
        }
        
        courseRepository.delete(course);
    }

    public Course publishCourse(UUID courseId, UUID instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to publish this course");
        }
        
        course.setPublished(true);
        return courseRepository.save(course);
    }

    public Course unpublishCourse(UUID courseId, UUID instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to unpublish this course");
        }
        
        course.setPublished(false);
        return courseRepository.save(course);
    }

    public Page<Course> getMyCourses(UUID instructorId, Pageable pageable) {
        return courseRepository.findByInstructorId(instructorId, pageable);
    }

    public Page<Course> getPublishedCourses(Pageable pageable) {
        return courseRepository.findByPublishedTrue(pageable);
    }

    public Page<Course> searchPublishedCourses(String search, Pageable pageable) {
        return courseRepository.searchPublishedCourses(search, pageable);
    }

    public Course getCourseWithModules(UUID courseId) {
        return courseRepository.findByIdWithModules(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
    }

    public Module createModule(UUID courseId, Module module, UUID instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to add modules to this course");
        }
        
        module.setCourse(course);
        if (module.getOrderIndex() == null) {
            int maxOrder = moduleRepository.findByCourseId(courseId).stream()
                    .mapToInt(Module::getOrderIndex)
                    .max()
                    .orElse(-1);
            module.setOrderIndex(maxOrder + 1);
        }
        return moduleRepository.save(module);
    }

    public Module updateModule(UUID moduleId, Module updates, UUID instructorId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        
        if (!module.getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to update this module");
        }
        
        module.setTitle(updates.getTitle());
        module.setDescription(updates.getDescription());
        module.setOrderIndex(updates.getOrderIndex());
        return moduleRepository.save(module);
    }

    public void deleteModule(UUID moduleId, UUID instructorId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        
        if (!module.getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to delete this module");
        }
        
        moduleRepository.delete(module);
    }

    public void reorderModules(UUID courseId, List<Module> modules, UUID instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to reorder modules");
        }
        
        for (int i = 0; i < modules.size(); i++) {
            Module module = modules.get(i);
            if (module.getCourse().getId().equals(courseId)) {
                module.setOrderIndex(i);
                moduleRepository.save(module);
            }
        }
    }

    public long getCourseCount(UUID instructorId) {
        return courseRepository.countByInstructorId(instructorId);
    }
}