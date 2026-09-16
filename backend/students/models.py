from django.db import models

class Student(models.Model):
    DEPARTMENT_CHOICES = [
        ('CSE', 'Computer Science & Engineering'),
        ('ECE', 'Electronics & Communication Engineering'),
        ('EEE', 'Electrical & Electronics Engineering'),
        ('IT', 'Information Technology'),
        ('MECH', 'Mechanical Engineering'),
        ('CIVIL', 'Civil Engineering'),
    ]

    YEAR_CHOICES = [
        (1, '1st Year'),
        (2, '2nd Year'),
        (3, '3rd Year'),
        (4, '4th Year'),
    ]

    name = models.CharField(max_length=100)
    register_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    year = models.IntegerField(choices=YEAR_CHOICES)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.register_number})"

    class Meta:
        ordering = ['-id']
