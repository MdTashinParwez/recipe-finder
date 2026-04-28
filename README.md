# 🍽️ RECIPE FINDER (Delishia)

<div align="center">

### A Full-Stack MERN Recipe Discovery Platform

Search recipes, save favorites, and manage personal cooking notes with a modern and responsive user experience.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![JWT Auth](https://img.shields.io/badge/Auth-JWT-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)

## 🌐 Live Demo
## 🚀 Project Preview 
🔗 **Live Website:** : https://delishia-drab.vercel.app
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/259942bb-a897-44c4-b060-ccb6e27ce886" />


</div>

---

# 📋 Project Overview

## Project Name
**Recipe Finder (Delishia)**

## Project Type
**Full-Stack Web Application**

## Purpose
A web-based recipe search and discovery platform where users can:

- Search recipes using keywords
- Save recipes as favorites
- Add personal cooking notes
- Manage favorite recipes securely
- Access recipes across all devices

## Technology Stack
**MERN Stack**

- **MongoDB**
- **Express.js**
- **React.js**
- **Node.js**

---

# 🎯 Project Objectives

## 1. Recipe Discovery
Allow users to search for recipes using keywords.

## 2. User Authentication
Secure user registration and login system using JWT.

## 3. Favorites Management
Users can save recipes and add personal notes.

## 4. Responsive Design
Smooth UI experience across desktop, tablet, and mobile.

## 5. Data Security
JWT-based authentication with secure password hashing.

---

# 📁 Project Structure

```bash
RECIPE FINDER/
├── Backend/                          (Node.js + Express Server)
│   ├── config/
│   │   └── db.js                    (MongoDB Connection)
│   │
│   ├── controllers/
│   │   └── userController.js        (Authentication Logic)
│   │
│   ├── models/
│   │   └── User.js                  (MongoDB Schema)
│   │
│   ├── routes/
│   │   ├── userRoutes.js            (User Routes)
│   │   └── favoriteRoutes.js        (Favorites Routes)
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        (JWT Verification)
│   │
│   ├── server.js                    (Server Setup)
│   ├── index.js                     (Entry Point)
│   └── package.json
│
└── frontend/                         (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── RecipeCard.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── NotesEditModal.jsx
    │   │   └── ScrollToTop.jsx
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── RecipePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── FavoritesPage.jsx
    │   │   └── NotFoundPage.jsx
    │   │
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── recipeService.js
    │   │   └── favoriteService.js
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    │
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```
````md
# 🔌 API Endpoints

## Authentication Routes

### Register User

```bash
POST /api/users/register
```
````

* **New user registration**
* **Email uniqueness check**
* **Password validation**
* **JWT token generation**

---

### Login User

```bash
POST /api/users/login
```

* **Secure login system**
* **Password verification using bcrypt**
* **JWT token generation**
* **User session management**

---

## Favorites Routes

### Add Recipe to Favorites

```bash
POST /api/favorites
```

* **Save recipes to favorites**
* **Prevent duplicate favorites**
* **Protected route using JWT**

---

### Update Recipe Notes

```bash
PUT /api/favorites/:recipeId
```

* **Add personal cooking notes**
* **Edit notes anytime**
* **Notes stored in MongoDB**

---

### Get User Favorites

```bash
GET /api/favorites
```

* **Fetch all saved recipes**
* **Display saved notes**
* **Personalized dashboard**

---

# 🔐 Authentication System

The project uses **JWT Authentication** for secure login and protected routes.

## Security Features

* **Password hashing using bcrypt**
* **JWT token authentication**
* **Protected private routes**
* **Secure login/logout system**
* **Authorization middleware**

---

# 📱 Frontend Features

## Main Pages

### Home Page

* **Recipe search bar**
* **Quick category buttons**
* **Real-time search results**
* **Responsive design**

### Recipe Details Page

* **Full recipe details**
* **Ingredients and instructions**
* **Add to favorites button**
* **Personal notes section**

### Login & Register Page

* **Form validation**
* **Secure authentication**
* **Error handling**

### Favorites Page

* **Saved recipes display**
* **Edit notes option**
* **Remove favorite recipes**

---

# 🚀 Key Features

* **Recipe search using TheMealDB API**
* **JWT-based user authentication**
* **Favorites management system**
* **Personal notes for recipes**
* **Responsive UI with Tailwind CSS**
* **Material UI components**
* **Smooth animations using Framer Motion**
* **Secure backend with MongoDB + Express**

---

# 🖥️ How To Run Project

## Backend Setup

```bash
cd Backend
npm install
```

### Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Run Backend

```bash
npm run dev
```

or

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

### Create `.env.local`

```env
VITE_API_URL=API URL 
VITE_BACKEND_API_URL=http://localhost:5000
```

### Run Frontend

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

# 🎨 UI/UX Features

* **Modern dark theme design**
* **Gradient overlays**
* **Smooth animations**
* **Responsive mobile layout**
* **Loading spinners**
* **User-friendly error messages**
* **Clean professional interface**

---

# 🛡️ Security Features

* **Password encryption using bcrypt**
* **JWT token authentication**
* **Protected routes**
* **Environment variables for secrets**
* **Input validation**
* **Safe API access control**

---

# 📝 Future Enhancements

* **Advanced recipe filters**
* **User profile management**
* **Ratings and reviews**
* **Password reset feature**
* **Meal planning system**
* **Shopping list generator**
* **Recipe sharing feature**
* **Custom recipe uploads**

---

# 📚 Conclusion

Recipe Finder is a complete **MERN Stack Full-Stack Project** that demonstrates:

* **Full-stack web development**
* **Authentication and authorization**
* **RESTful API development**
* **MongoDB database management**
* **External API integration**
* **Responsive frontend design**
* **Secure backend implementation**

This project provides a smooth and user-friendly platform for discovering, saving, and managing recipes efficiently.

---
