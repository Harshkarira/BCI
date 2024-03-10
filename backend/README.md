# Django Backend

This backend used for uploading and managing PDF files via the frontend application.

## Prerequisites

Ensure you have Python and Django installed on your system.

### Installing Python

- If you don't have Python installed, follow the steps outlined [here](https://www.python.org/downloads/) to download and install Python for your operating system.

### Installing Django

- Once Python is installed, you can install Django using pip:

```bash
pip install django
```

## Installation

- Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Start the Django development server:

   ```bash
   python manage.py runserver
   ```

   The server will run on `http://localhost:8000` by default.

2. Access the Django admin interface to manage PDF uploads at `http://localhost:8000/admin`.

3. PDF files uploaded via the frontend application will be stored in the `uploads` folder.

## File Structure

- `backend/`: Django project directory.
  - `backend/__pycache__/`: Python cache files.
  - `backend/__init__.py`: Python package initialization.
  - `backend/asgi.py`: ASGI configuration for web servers.
  - `backend/settings.py`: Django project settings.
  - `backend/urls.py`: URL configuration.
  - `backend/wsgi.py`: WSGI application entry point.
- `app/`: Django app directory.
  - `app/__pycache__/`: Python cache files.
  - `app/__init__.py`: Python package initialization.
  - `app/migrations/`: Database migration files.
    - `app/migrations/__pycache__/`: Python cache files.
    - `app/migrations/__init__.py`: Migration package initialization.
  - `app/admin.py`: Admin interface configuration.
  - `app/apps.py`: Django app configuration.
  - `app/models.py`: Database models.
  - `app/tests.py`: Test cases.
  - `app/views.py`: Views for handling HTTP requests.
- `pickle files/`: Directory for storing pickle files.
- `uploads/`: Directory for storing uploaded PDF files.
- `db.sqlite3`: SQLite database file.
- `manage.py`: Django project management script.

## Additional Notes

- Modify `settings.py` for database configuration, static files, and other Django settings.
- Customize the app's models, views, and admin interface as per your requirements.

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Python Documentation](https://docs.python.org/)

