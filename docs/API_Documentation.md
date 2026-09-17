# Student Management System — API Documentation

## 1. Introduction

The Student Management System provides REST API endpoints for performing CRUD operations on student records.

The API allows the frontend application to communicate with the backend server and database.

## 2. Base URL

```text
http://127.0.0.1:8000/
```

> Replace this with the actual base URL used by the project.

## 3. API Endpoints

| Method    | Endpoint              | Description      |
| --------- | --------------------- | ---------------- |
| GET       | `/api/students/`      | Get all students |
| GET       | `/api/students/<id>/` | Get one student  |
| POST      | `/api/students/`      | Create a student |
| PUT/PATCH | `/api/students/<id>/` | Update a student |
| DELETE    | `/api/students/<id>/` | Delete a student |

## 4. Get All Students

### Request

```text
GET /api/students/
```

### Purpose

Retrieves all student records from the database.

### Expected Response

```json
[
    {
        "id": 1,
        "name": "Arun Kumar",
        "email": "arun@example.com",
        "department": "Information Technology",
        "year": 2,
        "phone": "9876543210"
    }
]
```

## 5. Get Student by ID

### Request

```text
GET /api/students/1/
```

### Purpose

Retrieves a specific student using the student's ID.

## 6. Create Student

### Request

```text
POST /api/students/
```

### Request Body

```json
{
    "name": "Arun Kumar",
    "email": "arun@example.com",
    "department": "Information Technology",
    "year": 2,
    "phone": "9876543210"
}
```

### Expected Result

A new student record is created and stored in the database.

## 7. Update Student

### Request

```text
PUT /api/students/1/
```

or:

```text
PATCH /api/students/1/
```

### Request Body

```json
{
    "name": "Arun Kumar Updated",
    "email": "arun.updated@example.com",
    "department": "Information Technology",
    "year": 3,
    "phone": "9876543210"
}
```

### Expected Result

The selected student record is updated.

## 8. Delete Student

### Request

```text
DELETE /api/students/1/
```

### Expected Result

The selected student record is deleted from the database.

## 9. HTTP Status Codes

| Status Code | Meaning                       |
| ----------- | ----------------------------- |
| 200         | Successful request            |
| 201         | Resource created              |
| 204         | Resource deleted successfully |
| 400         | Invalid request/data          |
| 404         | Resource not found            |
| 500         | Server error                  |

## 10. API Testing

The API endpoints were tested to verify successful CRUD operations, validation, and error handling.

Screenshots of API testing are included in the `screenshots` folder.
