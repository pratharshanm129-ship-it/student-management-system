import re
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate_phone(self, value):
        if not re.match(r'^\d{10}$', value):
            raise serializers.ValidationError("Phone number must be exactly 10 digits.")
        return value

    def validate_cgpa(self, value):
        if value < 0.0 or value > 10.0:
            raise serializers.ValidationError("CGPA must be between 0.00 and 10.00.")
        return value

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return value
