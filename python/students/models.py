from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=150, unique=True)
    description = models.TextField(blank=True)
    duration_weeks = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class Student(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    enrolled_courses = models.ManyToManyField(
        Course, related_name="students", blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.email})"
