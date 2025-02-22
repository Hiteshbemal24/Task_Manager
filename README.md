# 📝 Task Management App

A **full-stack Task Management App** built with **React (Next.js)** for the frontend and **Node.js (Express & MongoDB)** for the backend.  
Users can **create, edit, delete, and complete tasks**, with features like **sorting, filtering, and authentication**.

## 🚀 Features

### ✅ **Frontend (Next.js)**
- **User Authentication**: Secure login & signup using JWT.
- **Task Management**: Create, update, delete, and complete tasks.
- **Sorting & Filtering**:
  - **Sort by**: Title, Due Date, Priority.
  - **Filter by**: Completion status, Due Date Range.
- **Stunning UI/UX**:
  - Responsive **mobile-first design**.
  - **Animated hover effects & transitions**.
  - **Dark mode support (optional)**.
- **Optimized API Calls**: Using React’s `useEffect` & `useState` efficiently.

### ✅ **Backend (Node.js, Express, MongoDB)**
- **RESTful API**: Built with **Express.js**.
- **User Authentication**:
  - Password hashing using `bcryptjs`
  - JWT-based authentication.
- **Task CRUD Operations**:
  - **Create, Read, Update, Delete** tasks.
- **Secure Routes**: Middleware to protect user routes.

---

# 🛠️ Setup Instructions

## **🔹 1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```
## **🔹 🖥️ 2️⃣ Backend Setup (Node.js, Express, MongoDB)**
### 📌 Install Dependencies
```sh
cd backend
npm install
```

### 📌 Setup Environment Variables
 - **Create a .env file inside the backend folder and add the following:
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   ### 📌 Start the Server
  ```sh
   npm start
  ```
- Backend runs on http://localhost:5000.

## ** 🌐 3️⃣ Frontend Setup (Next.js, Tailwind CSS)**
##  Install Dependencies
```sh
cd frontend
npm install

```
## 📌 Setup Environment Variables
- Create a .env.local file inside the frontend folder:
  ```sh
  NEXT_PUBLIC_API_URL=http://localhost:5000/api

  ```
## 📌 Start the Frontend
```sh
npm run dev
```
- Frontend runs on http://localhost:3000.

## 📡 API Endpoints

| Method | Endpoint         | Description      | Protected |
|--------|-----------------|------------------|-----------|
| **POST**   | `/api/auth/signup`  | User Signup      | ❌ No  |
| **POST**   | `/api/auth/login`   | User Login       | ❌ No  |
| **GET**    | `/api/tasks`        | Get all tasks    | ✅ Yes |
| **POST**   | `/api/tasks`        | Create a task    | ✅ Yes |
| **PUT**    | `/api/tasks/:id`    | Update a task    | ✅ Yes |
| **DELETE** | `/api/tasks/:id`    | Delete a task    | ✅ Yes |

✅ = Requires Authentication

## ⚡ Optimizations Applied

### ✅ Frontend Optimizations
- **Efficient State Management**: Using `useState`, `useContext`, and optimized API calls.
- **Lazy Loading**: Loads tasks **only when needed** to improve performance.
- **Debounced API Calls**: Prevents excessive requests by optimizing user input handling.
- **Optimized UI**:
  - **Smooth hover effects & animations** for a better user experience.
  - **Better spacing, padding, and UI responsiveness** for mobile & desktop users.

### ✅ Backend Optimizations
- **JWT Authentication**: Ensures secure user sessions.
- **Database Indexing**: Enhances query performance for faster data retrieval.
- **Optimized API Routes**: Reduced redundant queries for **faster API responses**.
- **Error Handling & Validation**: Implemented `express-validator` for clean and secure data input.
