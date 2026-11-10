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

import com.aktibolms.backend.dto.request.InstructorRequest;
import com.aktibolms.backend.dto.response.InstructorResponse;
import com.aktibolms.backend.service.InstructorService;
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
 * Tests for {@link InstructorController} using mocked services.
 * No database is required for these tests.
 *
 * Note: Spring Boot 4.1.2 removed {@code @WebMvcTest} and {@code @MockBean};
 * we use standalone {@code MockMvc} with Mockito mocks instead.
 */
@DisplayName("InstructorController")
class InstructorControllerTest {

    private MockMvc mockMvc;
    private InstructorService instructorService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        InstructorController controller = new InstructorController();
        instructorService = mock(InstructorService.class);
        ReflectionTestUtils.setField(controller, "instructorService", instructorService);

        objectMapper = new ObjectMapper();

        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setMessageConverters(new MappingJackson2HttpMessageConverter(objectMapper))
                .build();
    }

    private InstructorRequest request() {
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
    @DisplayName("POST /api/instructors should create an instructor and return 201")
    void createInstructor_returnsCreated() throws Exception {
        InstructorResponse response = new InstructorResponse();
        response.setId(1L);
        response.setInstructorId("I2024-001");
        response.setEmail("maria@example.com");
        response.setActive(true);
        when(instructorService.createInstructor(any(InstructorRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/instructors")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.instructorId").value("I2024-001"))
                .andExpect(jsonPath("$.email").value("maria@example.com"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    @DisplayName("GET /api/instructors/{id} should return an instructor and return 200")
    void getInstructorById_returnsOk() throws Exception {
        InstructorResponse response = new InstructorResponse();
        response.setId(1L);
        response.setInstructorId("I2024-001");
        response.setEmail("maria@example.com");
        when(instructorService.getInstructorById(1L)).thenReturn(response);

        mockMvc.perform(get("/api/instructors/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("maria@example.com"));
    }

    @Test
    @DisplayName("GET /api/instructors should return a paginated list and return 200")
    void getAllInstructors_returnsOk() throws Exception {
        Page<InstructorResponse> page = new PageImpl<>(java.util.List.of(), PageRequest.of(0, 20), 0);
        when(instructorService.getAllInstructors(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/instructors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(0));

        verify(instructorService).getAllInstructors(any(Pageable.class));
    }

    @Test
    @DisplayName("PUT /api/instructors/{id} should update an instructor and return 200")
    void updateInstructor_returnsOk() throws Exception {
        InstructorResponse response = new InstructorResponse();
        response.setId(1L);
        response.setEmail("maria@example.com");
        when(instructorService.updateInstructor(eq(1L), any(InstructorRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/instructors/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @DisplayName("DELETE /api/instructors/{id} should deactivate and return 200")
    void deactivateInstructor_returnsOk() throws Exception {
        doNothing().when(instructorService).deactivateInstructor(1L);

        mockMvc.perform(delete("/api/instructors/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Instructor account deactivated successfully"))
                .andExpect(jsonPath("$.id").value("1"));
    }
}
