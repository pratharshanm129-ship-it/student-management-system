import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from students.models import Student

sample_students = [
    {
        "name": "Arun Kumar",
        "register_number": "927621104001",
        "email": "arun.k@college.edu",
        "phone": "9876543210",
        "department": "CSE",
        "year": 4,
        "cgpa": "8.85"
    },
    {
        "name": "Priya Sharma",
        "register_number": "927621104002",
        "email": "priya.s@college.edu",
        "phone": "9876543211",
        "department": "ECE",
        "year": 3,
        "cgpa": "9.12"
    },
    {
        "name": "Karthik Raja",
        "register_number": "927621104003",
        "email": "karthik.r@college.edu",
        "phone": "9876543212",
        "department": "IT",
        "year": 2,
        "cgpa": "7.95"
    },
    {
        "name": "Divya Lakshmi",
        "register_number": "927621104004",
        "email": "divya.l@college.edu",
        "phone": "9876543213",
        "department": "EEE",
        "year": 4,
        "cgpa": "8.50"
    }
]

for s_data in sample_students:
    student, created = Student.objects.get_or_create(
        register_number=s_data["register_number"],
        defaults=s_data
    )
    if created:
        print(f"Created student: {student.name}")
    else:
        print(f"Student already exists: {student.name}")
