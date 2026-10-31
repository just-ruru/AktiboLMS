package com.aktibolms.service;

import com.aktibolms.entity.Course;
import com.aktibolms.dto.request.ContentBlockRequest;
import com.aktibolms.dto.request.LessonRequest;
import com.aktibolms.dto.request.ReorderRequest;
import com.aktibolms.entity.ContentBlock;
import com.aktibolms.entity.Lesson;
import com.aktibolms.entity.Module;
import com.aktibolms.entity.User;
import com.aktibolms.repository.ContentBlockRepository;
import com.aktibolms.repository.CourseRepository;
import com.aktibolms.repository.LessonRepository;
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
    private final LessonRepository lessonRepository;
    private final ContentBlockRepository contentBlockRepository;

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

    /* ---------- Lesson CRUD ---------- */

    public Lesson createLesson(UUID moduleId, LessonRequest request, UUID instructorId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));

        if (!module.getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to add lessons to this module");
        }

        int maxOrder = module.getLessons() == null ? -1 :
                module.getLessons().stream()
                        .mapToInt(Lesson::getOrderIndex)
                        .max().orElse(-1);

        Lesson lesson = Lesson.builder()
                .id(UUID.randomUUID())
                .module(module)
                .title(request.getTitle())
                .description(request.getDescription())
                .orderIndex(request.getOrderIndex() != null ? request.getOrderIndex() : maxOrder + 1)
                .build();

        return lessonRepository.save(lesson);
    }

    public Lesson updateLesson(UUID lessonId, LessonRequest request, UUID instructorId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        if (!lesson.getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to update this lesson");
        }

        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        if (request.getOrderIndex() != null) {
            lesson.setOrderIndex(request.getOrderIndex());
        }

        return lessonRepository.save(lesson);
    }

    public void deleteLesson(UUID lessonId, UUID instructorId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        if (!lesson.getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to delete this lesson");
        }

        lessonRepository.delete(lesson);
    }

    public void reorderLessons(UUID moduleId, List<ReorderRequest.Item> items, UUID instructorId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));

        if (!module.getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to reorder lessons in this module");
        }

        for (int i = 0; i < items.size(); i++) {
            ReorderRequest.Item item = items.get(i);
            Lesson lesson = lessonRepository.findById(item.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Lesson not found: " + item.getId()));
            lesson.setOrderIndex(i);
            lessonRepository.save(lesson);
        }
    }

    /* ---------- Content Block CRUD ---------- */

    public ContentBlock createContentBlock(UUID lessonId, ContentBlockRequest request, UUID instructorId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        if (!lesson.getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to add content blocks to this lesson");
        }

        ContentBlock block = ContentBlock.builder()
                .id(UUID.randomUUID())
                .lesson(lesson)
                .type(ContentBlock.Type.valueOf(request.getType()))
                .contentJson("")
                .orderIndex(request.getOrderIndex())
                .build();

        return contentBlockRepository.save(block);
    }

    public ContentBlock updateContentBlock(UUID blockId, ContentBlockRequest request, UUID instructorId) {
        ContentBlock block = contentBlockRepository.findById(blockId)
                .orElseThrow(() -> new IllegalArgumentException("Content block not found"));

        if (!block.getLesson().getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to update this content block");
        }

        if (request.getType() != null) {
            block.setType(ContentBlock.Type.valueOf(request.getType()));
        }
        if (request.getOrderIndex() != null) {
            block.setOrderIndex(request.getOrderIndex());
        }

        return contentBlockRepository.save(block);
    }

    public void deleteContentBlock(UUID blockId, UUID instructorId) {
        ContentBlock block = contentBlockRepository.findById(blockId)
                .orElseThrow(() -> new IllegalArgumentException("Content block not found"));

        if (!block.getLesson().getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to delete this content block");
        }

        contentBlockRepository.delete(block);
    }

    public void reorderContentBlocks(UUID lessonId, List<ReorderRequest.Item> items, UUID instructorId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        if (!lesson.getModule().getCourse().getInstructor().getId().equals(instructorId)) {
            throw new SecurityException("Not authorized to reorder content blocks in this lesson");
        }

        for (int i = 0; i < items.size(); i++) {
            ReorderRequest.Item item = items.get(i);
            ContentBlock block = contentBlockRepository.findById(item.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Content block not found: " + item.getId()));
            block.setOrderIndex(i);
            contentBlockRepository.save(block);
        }
    }
}