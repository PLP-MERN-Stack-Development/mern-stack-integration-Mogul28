

# 📝 MERN Blog Application

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** blog platform built for the **Week 4: Deep Dive into MERN Stack Integration** assignment.

This project demonstrates seamless integration between the front-end (React) and back-end (Node/Express), complete CRUD operations with MongoDB, authentication, and modern front-end features using React Hooks and Tailwind CSS.

---

## 🚀 Features

### 🔧 Core Features

* Full CRUD for blog posts (Create, Read, Update, Delete)
* Categories management
* RESTful API using Express.js and MongoDB
* React front-end with modern hooks (`useState`, `useEffect`, `useContext`)
* File/image upload using **Multer**
* User authentication with **JWT (JSON Web Tokens)**
* Pagination, loading states, and error handling
* Responsive and clean UI built with **Tailwind CSS**

### ⚡ Advanced Features

* Protected routes (only logged-in users can create/edit posts)
* Optimistic UI updates for smoother UX
* Centralized API service with Axios interceptors
* Toast notifications with `react-hot-toast`

---

## 📂 Project Structure

```
mern-blog/
│
├── server/                 # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── controllers/    # Logic for routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables (local)
│   └── package.json
│
└── client/                 # Frontend (React + Vite)
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # Auth context
    │   ├── pages/          # Page views
    │   ├── services/       # Axios instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    └── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/try/download/community)
* npm or yarn

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

---

### 3️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_blog
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm run dev
```

Server will start at: **[http://localhost:5000](http://localhost:5000)**

---

### 4️⃣ Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

React app will start at: **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 API Documentation

### 🔹 Authentication

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| `POST` | `/api/auth/register` | Register a new user                    |
| `POST` | `/api/auth/login`    | Login user and return JWT              |
| `GET`  | `/api/auth/me`       | Get current user info (requires token) |

### 🔹 Posts

| Method   | Endpoint         | Description                   |
| -------- | ---------------- | ----------------------------- |
| `GET`    | `/api/posts`     | Get all posts                 |
| `GET`    | `/api/posts/:id` | Get single post               |
| `POST`   | `/api/posts`     | Create a post (auth required) |
| `PUT`    | `/api/posts/:id` | Update post (auth required)   |
| `DELETE` | `/api/posts/:id` | Delete post (auth required)   |

### 🔹 Categories

| Method | Endpoint          | Description                         |
| ------ | ----------------- | ----------------------------------- |
| `GET`  | `/api/categories` | Fetch all categories                |
| `POST` | `/api/categories` | Create new category (auth required) |

---

## 🧰 Technologies Used

**Frontend:**

* React.js + Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast

**Backend:**

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer (file uploads)
* JWT for authentication
* bcryptjs for password hashing