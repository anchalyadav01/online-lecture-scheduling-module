const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ----------------- MySQL Connection -----------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anchal@01",
  database: "lecture_schedule",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// ----------------- LOGIN -----------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Admin login (hardcoded – acceptable for test)
  if (email === "admin@example.com" && password === "admin123") {
    return res.json({ status: "success", role: "admin" });
  }

  // Instructor login
  db.query(
    "SELECT * FROM instructors WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.json({
          status: "success",
          role: "instructor",
          instructorId: results[0].id,
        });
      } else {
        res.json({ status: "fail" });
      }
    }
  );
});

// ----------------- INSTRUCTORS -----------------
app.get("/instructors", (req, res) => {
  db.query("SELECT * FROM instructors", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ----------------- COURSES -----------------
app.post("/courses", (req, res) => {
  const { name, level, description, image } = req.body;
  db.query(
    "INSERT INTO courses (name, level, description, image) VALUES (?, ?, ?, ?)",
    [name, level, description, image],
    (err, result) => {
      if (err) throw err;
      res.json({ status: "success", courseId: result.insertId });
    }
  );
});

app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ----------------- LECTURES (BATCHES) -----------------
app.post("/lectures", (req, res) => {
  const { course_id, instructor_id, lecture_date } = req.body;

  db.query(
    "SELECT * FROM lectures WHERE instructor_id = ? AND lecture_date = ?",
    [instructor_id, lecture_date],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.json({
          status: "fail",
          message: "Instructor already has a lecture on this date",
        });
      } else {
        db.query(
          "INSERT INTO lectures (course_id, instructor_id, lecture_date) VALUES (?, ?, ?)",
          [course_id, instructor_id, lecture_date],
          (err2) => {
            if (err2) throw err2;
            res.json({ status: "success" });
          }
        );
      }
    }
  );
});

// Admin – all lectures
app.get("/lectures", (req, res) => {
  db.query("SELECT * FROM lectures", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Instructor – own lectures
app.get("/instructor/:id/lectures", (req, res) => {
  const instructorId = req.params.id;

  db.query(
    `SELECT lectures.id, courses.name AS course_name, lecture_date
     FROM lectures
     JOIN courses ON lectures.course_id = courses.id
     WHERE instructor_id = ?`,
    [instructorId],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// ----------------- START SERVER -----------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
