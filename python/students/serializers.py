from rest_framework import serializers
from .models import Student, Course


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "description", "duration_weeks", "created_at"]
        read_only_fields = ["id", "created_at"]


class StudentSerializer(serializers.ModelSerializer):
    enrolled_courses = CourseSerializer(many=True, read_only=True)
    course_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Course.objects.all(),
        source="enrolled_courses",
        write_only=True,
        required=False,
    )

    class Meta:
        model = Student
        fields = [
            "id", "name", "email", "age", "enrolled_courses",
            "course_ids", "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_age(self, value):
        if value < 1 or value > 120:
            raise serializers.ValidationError("Age must be between 1 and 120.")
        return value
