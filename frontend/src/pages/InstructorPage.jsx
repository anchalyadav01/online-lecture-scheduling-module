import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function InstructorPage() {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/instructor/${id}/lectures`)
      .then((res) => res.json())
      .then((data) => setLectures(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="container">
      <h2>Instructor Panel</h2>

      {lectures.length === 0 ? (
        <p>No lectures scheduled</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Lecture Date</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture) => (
              <tr key={lecture.id}>
                <td>{lecture.course_name}</td>
                <td>
                  {lecture.lecture_date
                    ? new Date(lecture.lecture_date).toLocaleDateString()
                    : "Not Assigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InstructorPage;
