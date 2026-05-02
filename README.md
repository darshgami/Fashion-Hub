# FASHION HUB - E-Commerce Platform

A production-ready e-commerce website based on the Indian fashion industry.

## 🚀 Tech Stack
- **Frontend:** React JS (Vite), Framer Motion, Lucide React, Axios
- **Backend:** Python Django, Django REST Framework
- **Database:** MySQL
- **Auth:** JWT (JSON Web Tokens)

## 🛠️ Setup Instructions

### Backend (Django)
1. **Database:** Create a MySQL database named `fashion_hub`.
2. **Environment:** Go to `backend` directory.
3. **Settings:** Update `DATABASES` settings in `core/settings.py` with your MySQL `USER` and `PASSWORD`.
4. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
5. **Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. **Populate Data:**
   ```bash
   python populate_data.py
   ```
7. **Run Server:**
   ```bash
   python manage.py runserver
   ```

### Frontend (React)
1. **Environment:** Go to `frontend` directory.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run Dev Server:**
   ```bash
   npm run dev
   ```

## 🎯 Features
- **Modern UI:** Premium Indian fashion aesthetic.
- **Filtering:** Filter by category (Ethnic, Western, etc.), Price, and Search.
- **Cart System:** Persistent cart with quantity updates.
- **Auth:** Simple JWT based register/login.
- **Blog:** Fashion insights with LinkedIn sharing.

## 📂 Project Structure
- `/backend`: Django REST API.
- `/frontend`: React application.
- `/database`: SQL schema reference.

## 🔑 Default Credentials
- **Admin:** admin@fashionhub.com / admin123 (After running populate_data.py)
