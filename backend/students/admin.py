from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'register_number', 'email', 'department', 'year', 'cgpa', 'created_at')
    search_fields = ('name', 'register_number', 'email')
    list_filter = ('department', 'year')
    ordering = ('-id',)
