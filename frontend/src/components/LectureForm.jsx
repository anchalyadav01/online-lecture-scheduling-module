import { useState, useEffect } from "react";
import { getInstructors, getCourses, addLecture } from "../services/api";

const LectureForm = ({ onLectureAdded }) => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecture, setLecture] = useState({
    course_id: "",
    instructor_id: "",
    date: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInstructors(await getInstructors());
        setCourses(await getCourses());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setLecture({ ...lecture, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLecture(lecture);
      alert("Lecture added successfully!");
      setLecture({ course_id: "", instructor_id: "", date: "" });
      onLectureAdded();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <select name="course_id" value={lecture.course_id} onChange={handleChange} required>
        <option value="">Select Course</option>
        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <select name="instructor_id" value={lecture.instructor_id} onChange={handleChange} required>
        <option value="">Select Instructor</option>
        {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
      </select>

      <input type="date" name="date" value={lecture.date} onChange={handleChange} required />
      <button type="submit">Add Lecture</button>
    </form>
  );
};

export default LectureForm;
