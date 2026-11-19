from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Student, Course
from .serializers import StudentSerializer, CourseSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.prefetch_related("enrolled_courses").all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
