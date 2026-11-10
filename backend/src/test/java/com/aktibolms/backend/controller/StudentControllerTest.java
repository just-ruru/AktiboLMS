package com.aktibolms.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.aktibolms.backend.dto.request.StudentRequest;
import com.aktibolms.backend.dto.response.StudentResponse;
import com.aktibolms.backend.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/**
 * Tests for {@link StudentController} using mocked services.
 * No database is required for these tests.
 *
 * Note: Spring Boot 4.1.2 removed {@code @WebMvcTest} and {@code @MockBean};
 * we use standalone {@code MockMvc} with Mockito mocks instead.
 */
@DisplayName("StudentController")
class StudentControllerTest {

    private MockMvc mockMvc;
    private StudentService studentService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        StudentController controller = new StudentController();
        studentService = mock(StudentService.class);
        ReflectionTestUtils.setField(controller, "studentService", studentService);

        objectMapper = new ObjectMapper();

        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setMessageConverters(new MappingJackson2HttpMessageConverter(objectMapper))
                .build();
    }

    private StudentRequest request() {
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
    @DisplayName("POST /api/students should create a student and return 201")
    void createStudent_returnsCreated() throws Exception {
        StudentResponse response = new StudentResponse();
        response.setId(1L);
        response.setStudentId("S2024-001");
        response.setEmail("juan@example.com");
        response.setActive(true);
        when(studentService.createStudent(any(StudentRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.studentId").value("S2024-001"))
                .andExpect(jsonPath("$.email").value("juan@example.com"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    @DisplayName("GET /api/students/{id} should return a student and return 200")
    void getStudentById_returnsOk() throws Exception {
        StudentResponse response = new StudentResponse();
        response.setId(1L);
        response.setStudentId("S2024-001");
        response.setEmail("juan@example.com");
        when(studentService.getStudentById(1L)).thenReturn(response);

        mockMvc.perform(get("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("juan@example.com"));
    }

    @Test
    @DisplayName("GET /api/students should return a paginated list and return 200")
    void getAllStudents_returnsOk() throws Exception {
        Page<StudentResponse> page = new PageImpl<>(java.util.List.of(), PageRequest.of(0, 20), 0);
        when(studentService.getAllStudents(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(0));

        verify(studentService).getAllStudents(any(Pageable.class));
    }

    @Test
    @DisplayName("PUT /api/students/{id} should update a student and return 200")
    void updateStudent_returnsOk() throws Exception {
        StudentResponse response = new StudentResponse();
        response.setId(1L);
        response.setEmail("juan@example.com");
        when(studentService.updateStudent(eq(1L), any(StudentRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/students/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @DisplayName("DELETE /api/students/{id} should deactivate and return 200")
    void deactivateStudent_returnsOk() throws Exception {
        doNothing().when(studentService).deactivateStudent(1L);

        mockMvc.perform(delete("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Student account deactivated successfully"))
                .andExpect(jsonPath("$.id").value("1"));
    }
}
