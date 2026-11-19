# EduTracker Solutions — Student & Course REST API

A Django REST Framework assessment solution with CRUD endpoints for students and courses, a many-to-many enrollment relationship, optional token authentication, Django admin, and pagination.

## 1. Setup (Windows PowerShell)

```powershell
cd edutracker_drf_solution
py -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
py manage.py makemigrations students
py manage.py migrate
py manage.py createsuperuser
py manage.py runserver
```

If PowerShell blocks activation, run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

API root: http://127.0.0.1:8000/api/  
Admin: http://127.0.0.1:8000/admin/

## 2. Endpoints

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/students/` | List students |
| POST | `/api/students/` | Add student |
| GET | `/api/students/{id}/` | Get one student |
| PUT/PATCH | `/api/students/{id}/` | Update student |
| DELETE | `/api/students/{id}/` | Delete student |
| GET | `/api/courses/` | List courses |
| POST | `/api/courses/` | Add course |
| GET | `/api/courses/{id}/` | Get one course |
| PUT/PATCH | `/api/courses/{id}/` | Update course |
| DELETE | `/api/courses/{id}/` | Delete course |
| POST | `/api/auth/token/` | Obtain auth token |

## 3. Example JSON

Create a course:
```json
{
  "title": "Python Programming",
  "description": "Python fundamentals and backend development",
  "duration_weeks": 8
}
```

Create a student:
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "age": 21,
  "course_ids": [1]
}
```

The response includes `enrolled_courses` with course details. To change enrollments, send `course_ids` in a PUT/PATCH request. For example:
```json
{
  "course_ids": [1, 2]
}
```

## 4. Authentication

The assessment says token authentication is optional. This project enables DRF Token Authentication.

1. Create a Django superuser using `py manage.py createsuperuser`.
2. Obtain a token with POST `/api/auth/token/` and JSON:
```json
{
  "username": "your_admin_username",
  "password": "your_password"
}
```
3. For POST, PUT, PATCH, and DELETE requests, add this header in Postman:
```
Authorization: Token YOUR_TOKEN_HERE
```

GET requests are public. Write operations require authentication.

## 5. Postman testing

Choose Body → raw → JSON for POST/PUT/PATCH requests. Use the endpoint table above. Test:
- Create a course, then create a student with its course ID.
- GET students and confirm the nested course data appears.
- PATCH a student with `course_ids` to update enrollment.
- DELETE a student/course and verify it is removed.

## 6. Reflective questions

### A. Real-time notifications when a student enrolls
Use Django signals or, preferably for a production system, trigger a background task after a successful enrollment update. Celery with Redis can process notification jobs asynchronously. For instant in-app updates, use Django Channels with WebSockets. Store notification records in the database so users can see missed notifications later.

### B. Video course uploads with file size limits
Add a `FileField` to the course or a separate lesson model. Validate file size in a serializer or model validator (for example, reject files larger than 100 MB). Also validate allowed file types, configure `MEDIA_ROOT` and `MEDIA_URL`, and store production videos in object storage rather than on the application server. Enforce limits at the reverse proxy/storage layer too.

### C. Rate limiting for high frontend/mobile traffic
Use DRF throttling classes such as `AnonRateThrottle` and `UserRateThrottle`, configure rates in `REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"]`, and consider Redis-backed throttling or an API gateway for distributed production deployments. Monitor 429 responses and tune limits based on actual usage.

Example settings:
```python
REST_FRAMEWORK = {
    # keep the authentication, permissions and pagination settings above
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "20/hour",
        "user": "1000/hour",
    },
}
```

## 7. GitHub

```powershell
git init
git add .
git commit -m "Build EduTracker student course API"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Do not commit `.env`, `db.sqlite3`, or your virtual environment.

## 8. PythonAnywhere deployment checklist

1. Push the project to GitHub.
2. Create a PythonAnywhere account and a new web app.
3. Clone your repository in a Bash console.
4. Create and activate a virtual environment; install `requirements.txt`.
5. Configure the WSGI file to point to `edutracker.wsgi.application`.
6. Set environment variables (`SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`) in the web app configuration.
7. Run migrations and reload the web app.
8. Use a production database and static/media storage appropriate to the deployment.

For production, use a strong secret key, `DEBUG=False`, a restricted `ALLOWED_HOSTS`, HTTPS, backups, and a production database.
