import { useState } from "react";
import { addCourse } from "../services/api";

const CourseForm = ({ onCourseAdded }) => {
  const [course, setCourse] = useState({
    name: "",
    level: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourse(course);
      alert("Course added successfully!");
      setCourse({ name: "", level: "", description: "", image: "" });
      onCourseAdded(); // refresh course list
    } catch (error) {
      alert(error.message);
    }
  };
return (
  <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
    <input
      name="name"
      placeholder="Course Name"
      value={course.name}
      onChange={handleChange}
      required
    />

    <input
      name="level"
      placeholder="Level"
      value={course.level}
      onChange={handleChange}
      required
    />

    <textarea
      name="description"
      placeholder="Description"
      value={course.description}
      onChange={handleChange}
      required
    />

    <input
      name="image"
      placeholder="Image URL (optional)"
      value={course.image}
      onChange={handleChange}
    />

    <button type="submit">Add Course</button>
  </form>
);
};
export default CourseForm;
