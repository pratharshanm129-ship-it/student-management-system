from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from students.models import Student

class StudentAPITests(APITestCase):

    def setUp(self):
        self.student_data = {
            "name": "Arun Kumar",
            "register_number": "927621104001",
            "email": "arun.k@college.edu",
            "phone": "9876543210",
            "department": "CSE",
            "year": 4,
            "cgpa": "8.85"
        }
        self.student = Student.objects.create(**self.student_data)
        self.list_url = reverse('student-list')
        self.detail_url = reverse('student-detail', kwargs={'pk': self.student.id})

    def test_create_student_success(self):
        """Test creating a new student with valid data."""
        new_student_data = {
            "name": "Priya Sharma",
            "register_number": "927621104002",
            "email": "priya.s@college.edu",
            "phone": "9876543211",
            "department": "ECE",
            "year": 3,
            "cgpa": "9.12"
        }
        response = self.client.post(self.list_url, new_student_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], "Priya Sharma")
        self.assertEqual(Student.objects.count(), 2)

    def test_list_students(self):
        """Test fetching list of all students."""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['register_number'], "927621104001")

    def test_get_student_detail_success(self):
        """Test retrieving single student detail by ID."""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Arun Kumar")

    def test_get_student_detail_not_found(self):
        """Test retrieving non-existent student ID returns 404."""
        invalid_url = reverse('student-detail', kwargs={'pk': 9999})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_student_success(self):
        """Test updating an existing student record."""
        updated_data = {
            "name": "Arun Kumar Updated",
            "register_number": "927621104001",
            "email": "arun.k@college.edu",
            "phone": "9876543210",
            "department": "CSE",
            "year": 4,
            "cgpa": "9.50"
        }
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['cgpa'], "9.50")
        self.student.refresh_from_db()
        self.assertEqual(float(self.student.cgpa), 9.50)

    def test_delete_student_success(self):
        """Test deleting a student record."""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Student.objects.count(), 0)

    def test_search_students(self):
        """Test searching students by name keyword."""
        response = self.client.get(f"{self.list_url}?search=Arun")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        response_empty = self.client.get(f"{self.list_url}?search=NonExistent")
        self.assertEqual(response_empty.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_empty.data), 0)

    def test_duplicate_register_number_validation(self):
        """Test creating a student with duplicate register number fails with HTTP 400."""
        duplicate_data = {
            "name": "Duplicate Reg",
            "register_number": "927621104001",
            "email": "different.email@college.edu",
            "phone": "9876543219",
            "department": "IT",
            "year": 1,
            "cgpa": "8.00"
        }
        response = self.client.post(self.list_url, duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('register_number', response.data)

    def test_duplicate_email_validation(self):
        """Test creating a student with duplicate email fails with HTTP 400."""
        duplicate_data = {
            "name": "Duplicate Email",
            "register_number": "927621104999",
            "email": "arun.k@college.edu",
            "phone": "9876543219",
            "department": "IT",
            "year": 1,
            "cgpa": "8.00"
        }
        response = self.client.post(self.list_url, duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_invalid_cgpa_validation(self):
        """Test creating a student with CGPA out of range fails with HTTP 400."""
        invalid_data = {
            "name": "Invalid CGPA",
            "register_number": "927621104002",
            "email": "cgpa.invalid@college.edu",
            "phone": "9876543211",
            "department": "ECE",
            "year": 2,
            "cgpa": "11.50"
        }
        response = self.client.post(self.list_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('cgpa', response.data)

    def test_invalid_email_validation(self):
        """Test creating a student with invalid email format fails with HTTP 400."""
        invalid_data = {
            "name": "Invalid Email",
            "register_number": "927621104002",
            "email": "not-an-email",
            "phone": "9876543211",
            "department": "ECE",
            "year": 2,
            "cgpa": "8.50"
        }
        response = self.client.post(self.list_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
