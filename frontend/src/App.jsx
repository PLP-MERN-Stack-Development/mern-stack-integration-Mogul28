import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import CreateEditPost from "./pages/CreateEditPost.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { user } = useAuth();

  // Simple route guard for protected pages
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* 🔝 Navbar always visible */}
      <Navbar />

      {/* 🔔 Global toast notifications */}
      <Toaster position="top-right" />

      {/* 📄 Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateEditPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <CreateEditPost />
              </PrivateRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ⚓ Footer */}
      <Footer />
    </div>
  );
}

export default App;

