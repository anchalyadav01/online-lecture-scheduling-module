import { useState, useEffect } from "react";
import { getInstructors, getCourses, getLectures } from "../services/api";
import CourseForm from "../components/CourseForm";
import LectureForm from "../components/LectureForm";

const AdminPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  const fetchData = async () => {
    try {
      setInstructors(await getInstructors());
      setCourses(await getCourses());
      setLectures(await getLectures());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Admin Panel</h1>

      <h2>Instructors</h2>
      <ul>
        {instructors.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>

      <h2>Courses & Batches</h2>

      {courses.map((course) => (
        <div key={course.id} className="card">
          <h3>{course.name}</h3>
          <p>
            <b>Level:</b> {course.level}
          </p>
          <p>{course.description}</p>

          <h4>Batches (Lectures)</h4>
          <ul>
            {lectures.filter((l) => l.course_id === course.id).length === 0 ? (
              <li>No batches added yet</li>
            ) : (
              lectures
                .filter((l) => l.course_id === course.id)
                .map((l) => (
                  <li key={l.id}>
                    {new Date(l.lecture_date).toDateString()}
                  </li>
                ))
            )}
          </ul>
        </div>
      ))}

      <h2>Add Course</h2>
      <CourseForm onCourseAdded={fetchData} />

      <h2>Add Batch (Lecture)</h2>
      <LectureForm onLectureAdded={fetchData} />
    </div>
  );
};

export default AdminPage;
