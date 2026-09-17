# Student Management System 🎓

A full-stack college web application for managing student records built with **React (Vite)**, **Python Django REST Framework (DRF)**, **SQLite**, and **Vanilla CSS**.

---

## ✨ Features

- **Full Student CRUD Operations**: Create, Read, Update, and Delete student records cleanly.
- **Real-Time Search**: Instant search by Student Name, Register Number, Email, or Department.
- **Department Filtering**: Filter students by department (CSE, ECE, EEE, IT, MECH, CIVIL).
- **Dual-Layer Validation**:
  - **Client-side**: Form field validation for required inputs, email pattern, 10-digit phone number, and CGPA range (0.00 – 10.00).
  - **Server-side**: DRF `StudentSerializer` validation enforcing unique `register_number`, unique `email`, phone digit check, and CGPA limits.
- **RESTful API**: Standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) returning clean JSON and proper status codes (`200`, `201`, `204`, `400`, `404`).
- **Responsive Modern UI**: Built with a clean CSS design system, modal dialogs, confirm action prompts, and floating toast notification alerts.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS (Modern flexbox/grid layout, CSS variables)
- **Icons**: Lucide React

### Backend
- **Language**: Python 3.x
- **Framework**: Django 6.x
- **API Toolkit**: Django REST Framework (DRF)
- **CORS Handling**: `django-cors-headers`

### Database
- **Engine**: SQLite (`db.sqlite3` embedded database)

### Testing & Tools
- **Backend Testing**: Django `APITestCase` automated unit tests
- **API Testing**: Postman Collection (`Student_Management_System.postman_collection.json`)

---

## 📁 Project Structure

```text
Activity/
├── backend/
│   ├── backend/             # Django project settings & URL routing
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── students/            # Student application app
│   │   ├── admin.py         # Django Admin model configuration
│   │   ├── models.py        # Student database schema
│   │   ├── serializers.py   # DRF serialization & validation rules
│   │   ├── views.py         # StudentViewSet API controller
│   │   ├── urls.py          # Student API router endpoints
│   │   ├── tests.py         # Automated API unit tests
│   │   └── migrations/      # Database migrations
│   ├── .env.example         # Environment template for backend
│   ├── db.sqlite3           # SQLite database
│   ├── manage.py            # Django management script
│   ├── requirements.txt     # Python package dependencies
│   └── seed_data.py         # Safe, idempotent initial dataset script
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (Modals, Table, SearchBar, Navbar)
│   │   ├── services/
│   │   │   └── api.js       # HTTP service using Fetch API & environment base URL
│   │   ├── App.jsx          # Main application component & state manager
│   │   ├── App.css
│   │   ├── index.css        # Global CSS design system
│   │   └── main.jsx         # React application entry point
│   ├── .env.example         # Environment template for frontend
│   ├── package.json
│   └── vite.config.js
├── README.md                # Project documentation
├── Student_Management_System.postman_collection.json # Postman API test suite
└── .gitignore               # Ignored files configuration
```

---

## ⚙️ Environment Variables

Before running the backend or frontend, copy the example environment files:

### Backend (`backend/.env`)
Create `backend/.env` based on `backend/.env.example`:
```ini
DJANGO_SECRET_KEY=replace-with-a-development-secret-key
DEBUG=True
```

### Frontend (`frontend/.env`)
Create `frontend/.env` based on `frontend/.env.example`:
```ini
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## 🚀 Installation & Setup Guide

### 1. Backend Setup (Django REST)

1. Open a terminal and navigate to `backend`:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

5. (Optional) Populate initial sample data:
   ```bash
   python seed_data.py
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   > The REST API server will run at `http://127.0.0.1:8000/api/students/`.

---

### 2. Frontend Setup (React / Vite)

1. Open a second terminal window and navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your web browser and visit `http://localhost:5173`.

---

## 📡 REST API Endpoints

| HTTP Method | Endpoint | Description | Sample Request Body / Query | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/students/` | List all student records | None | `200 OK` |
| `GET` | `/api/students/?search=Arun` | Search students by keyword | `search=Arun` | `200 OK` |
| `POST` | `/api/students/` | Create a new student record | JSON Student Object | `201 Created` |
| `GET` | `/api/students/{id}/` | Retrieve details for a single student | None | `200 OK` |
| `PUT` | `/api/students/{id}/` | Update student details | JSON Student Object | `200 OK` |
| `DELETE` | `/api/students/{id}/` | Delete a student record | None | `204 No Content` |

---

## 🧪 Testing

### 1. Backend Automated Tests
To run the Django test suite covering CRUD endpoints, search filtering, and field validation:
```bash
cd backend
python manage.py test
```

### 2. Postman Collection
1. Import `Student_Management_System.postman_collection.json` into Postman.
2. Ensure the Django backend is running at `http://127.0.0.1:8000`.
3. Test positive CRUD endpoints (Requests 1 to 6) and negative validation scenarios (Requests 7 to 10).

---

## 🔮 Future Enhancements

- Pagination support for handling large datasets.
- Export student lists to CSV / PDF format.
- Role-based user authentication for admin and faculty access.

**## Repository**

GitHub Repository:

https://github.com/pratharshanm129-ship-it/student-management-system

**## Project Status**

The project is developed as a complete CRUD-based web application for academic submission and demonstration.
