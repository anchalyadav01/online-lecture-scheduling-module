# Online Lecture Scheduling Module

An Online Lecture Scheduling Module built using **React (Frontend)**, **Node.js + Express (Backend)**, and **MySQL**.  
This system allows **Admin** and **Instructor** roles to manage courses and lectures (batches).

---

## 🚀 Features

### 👤 Authentication
- Login system for **Admin** and **Instructor**
- Role-based access after login

### 📚 Course Management (Admin)
- Add new courses
- Each course includes:
  - Name
  - Level
  - Description
  - Image URL
- One course can have **multiple lecture batches**

### 👨‍🏫 Instructor Panel
- View assigned courses
- Manage lectures/batches for courses

### 🗄 Database
- MySQL database
- Proper relational structure for courses and lectures

---

## 🛠 Tech Stack

### Frontend
- React.js
- HTML, CSS (Normal CSS – no Tailwind)
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- mysql2 package

### Tools
- Git & GitHub
- SQL Workbench

---

## 📁 Project Structure

Online Lecture Scheduling Module/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── routes/
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── App.js
│ └── package.json
│
├── lecture_schedule.sql
└── README.md

---

## ⚙️ Setup Instructions

setup_instructions:
  clone_repository:
    step: "1️⃣ Clone Repository"
    commands:
      - git clone https://github.com/anchalyadav01/online-lecture-scheduling-module.git
      - cd "Online Lecture Scheduling Module"

  database_setup:
     "2️⃣ Database Setup"
    details:
      - Install MySQL Server
      - Open MySQL Workbench
      - Create a database (example: lecture_schedule)
      - Import the SQL dump file: lecture_schedule.sql

  backend_setup:
     "3️⃣ Backend Setup"
    commands:
      - cd backend
      - npm install
      - node server.js
    notes:
      - Server runs on port 5000
      - Ensure MySQL credentials are correct in server.js

  frontend_setup:
     "4️⃣ Frontend Setup"
    commands:
      - cd frontend
      - npm install
      - npm start
    notes:
      - Frontend runs on port 3000
      
"5.Database Dump"
The database dump file is included:

lecture_schedule.sql
🔑 Login Roles
Admin

1.Add courses
2.Manage instructors

Instructor

1.View courses
2.Manage lecture batches
