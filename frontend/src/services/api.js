const API_BASE = "http://localhost:5000";

// ---------------- Instructors ----------------
export const getInstructors = async () => {
  const res = await fetch(`${API_BASE}/instructors`);
  if (!res.ok) throw new Error("Failed to fetch instructors");
  return await res.json();
};

// ---------------- Courses ----------------
export const getCourses = async () => {
  const res = await fetch(`${API_BASE}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return await res.json();
};

export const addCourse = async (courseData) => {
  const res = await fetch(`${API_BASE}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw new Error("Failed to add course");
  return await res.json();
};

// ---------------- Lectures / Batches ----------------
export const addLecture = async (lectureData) => {
  const res = await fetch(`${API_BASE}/lectures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lectureData),
  });
  if (!res.ok) throw new Error("Failed to add lecture");
  return await res.json();
};

// ✅ Admin – all batches
export const getLectures = async () => {
  const res = await fetch(`${API_BASE}/lectures`);
  if (!res.ok) throw new Error("Failed to fetch lectures");
  return await res.json();
};

// Instructor – only own batches
export const getLecturesByInstructor = async (instructorId) => {
  const res = await fetch(`${API_BASE}/instructor/${instructorId}/lectures`);
  if (!res.ok) throw new Error("Failed to fetch instructor lectures");
  return await res.json();
};
