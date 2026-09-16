# Student Management System 🎓

A full-stack college web application for managing student records built with **React**, **Python Django REST Framework (DRF)**, **SQLite**, and **Vanilla CSS**.

---

## 🚀 Technology Stack
- **Frontend**: React (Vite build system)
- **Styling**: Vanilla CSS (Modern glassmorphism UI, flexbox/grid layout, responsive design system)
- **Backend**: Python 3.14, Django 6.1, Django REST Framework (DRF) 3.18
- **Database**: SQLite (`db.sqlite3` embedded ORM database)
- **CORS Handling**: `django-cors-headers`
- **API Testing**: Postman Collection (`Student_Management_System.postman_collection.json`)
- **Version Control**: Git & GitHub

---

## 📋 Core CRUD & Student Fields

### Student Attributes
1. `id` - Auto Primary Key
2. `name` - Full Name
3. `register_number` - Unique Registration Number
4. `email` - Unique Email Address
5. `phone` - 10-Digit Phone Number
6. `department` - Department Choice (CSE, ECE, EEE, IT, MECH, CIVIL)
7. `year` - Academic Year (1, 2, 3, 4)
8. `cgpa` - CGPA Score (0.00 to 10.00)

---

## ⚡ Quick Start & Execution Guide

### 1. Running the Django REST Backend
Open a terminal in the project root:

```bash
cd backend

# Activate Virtual Environment (Windows PowerShell / CMD)
venv\Scripts\activate

# Run database migrations (already initialized with sample data)
python manage.py migrate

# Start Django Development Server on http://127.0.0.1:8000
python manage.py runserver
```

> **Note**: The backend API will be live at `http://127.0.0.1:8000/api/students/`.

---

### 2. Running the React Frontend
Open a second terminal window:

```bash
cd frontend

# Install packages (already installed)
npm install

# Start Vite Development Server
npm run dev
```

> **Note**: Open your browser at `http://localhost:5173` to view and interact with the application.

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Request Body | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/students/` | List all student records | None | `200 OK` |
| `GET` | `/api/students/?search=...` | Search by Name, Reg No, or Email | None | `200 OK` |
| `POST` | `/api/students/` | Add a new student record | JSON Object | `201 Created` |
| `GET` | `/api/students/<id>/` | Retrieve single student details | None | `200 OK` |
| `PUT` | `/api/students/<id>/` | Update existing student record | JSON Object | `200 OK` |
| `DELETE` | `/api/students/<id>/` | Delete student record | None | `204 No Content` |

---

## 🧪 Postman API Testing Guide
1. Open **Postman**.
2. Click **Import** and select `Student_Management_System.postman_collection.json` located in the root directory.
3. Make sure the Django server is running (`http://127.0.0.1:8000`).
4. Run requests in order:
   - `1. List All Students`
   - `2. Search Students`
   - `3. Create Student`
   - `4. Get Single Student Detail`
   - `5. Update Student`
   - `6. Delete Student`

---

## 🐙 Git & GitHub SOP Instructions

```bash
# Initialize local git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete Student Management System full-stack CRUD app"

# Link to remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/Student-Management-System.git
git branch -M main
git push -u origin main
```

---

## 🎯 Viva Voce Defense Prep (Q&A)

### Q1: What is Django REST Framework (DRF) and why use it?
**Answer**: DRF is a powerful toolkit for building Web APIs in Django. It converts Django ORM database objects into standard JSON format (serialization) and parses incoming JSON into validated Python objects (deserialization).

### Q2: How does CORS work in this project?
**Answer**: Since React runs on `http://localhost:5173` and Django runs on `http://127.0.0.1:8000`, the browser enforces Same-Origin Policy. We used `django-cors-headers` middleware to return HTTP `Access-Control-Allow-Origin` headers, allowing the React client to make cross-origin requests.

### Q3: Where are validations enforced?
**Answer**: Dual-layer validation is implemented:
1. **Client-side**: React state checks input formats before sending HTTP requests (e.g. 10-digit phone, CGPA 0-10, valid email pattern).
2. **Server-side**: DRF `StudentSerializer` enforces `validate_phone()`, `validate_cgpa()`, and database-level unique constraints (`register_number`, `email`).

### Q4: How is SQLite integrated with Django?
**Answer**: Django uses SQLite as its default relational database engine via standard Django ORM methods (`Student.objects.all()`, `Student.objects.create()`). No raw SQL queries are written manually, which also prevents SQL injection attacks.
