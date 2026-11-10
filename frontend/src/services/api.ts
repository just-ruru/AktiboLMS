const API_BASE = "http://localhost:8080/api";

export type Student = {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Instructor = {
  id: number;
  instructorId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StudentRequest = {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
};

export type InstructorRequest = {
  instructorId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
};

export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(body || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// ---------- Students ----------

export function createStudent(data: StudentRequest): Promise<Student> {
  return request(`${API_BASE}/students`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getStudentById(id: number): Promise<Student> {
  return request(`${API_BASE}/students/${id}`);
}

export function getAllStudents(
  page = 0,
  size = 20
): Promise<PageResponse<Student>> {
  return request(
    `${API_BASE}/students?page=${page}&size=${size}&sort=createdAt,desc`
  );
}

export function updateStudent(id: number, data: StudentRequest): Promise<Student> {
  return request(`${API_BASE}/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deactivateStudent(id: number): Promise<{ message: string; id: string }> {
  return request(`${API_BASE}/students/${id}`, {
    method: "DELETE",
  });
}

// ---------- Instructors ----------

export function createInstructor(data: InstructorRequest): Promise<Instructor> {
  return request(`${API_BASE}/instructors`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getInstructorById(id: number): Promise<Instructor> {
  return request(`${API_BASE}/instructors/${id}`);
}

export function getAllInstructors(
  page = 0,
  size = 20
): Promise<PageResponse<Instructor>> {
  return request(
    `${API_BASE}/instructors?page=${page}&size=${size}&sort=createdAt,desc`
  );
}

export function updateInstructor(
  id: number,
  data: InstructorRequest
): Promise<Instructor> {
  return request(`${API_BASE}/instructors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deactivateInstructor(id: number): Promise<{ message: string; id: string }> {
  return request(`${API_BASE}/instructors/${id}`, {
    method: "DELETE",
  });
}
