from django.contrib import admin
from .models import Student, Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "duration_weeks", "created_at")
    search_fields = ("title",)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "age", "created_at")
    search_fields = ("name", "email")
    filter_horizontal = ("enrolled_courses",)
