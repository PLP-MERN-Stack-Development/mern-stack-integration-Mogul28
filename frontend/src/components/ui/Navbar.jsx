import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          MERN Blog
        </Link>

        <div className="space-x-4">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/create"
                className="hover:text-indigo-600 transition-colors duration-200"
              >
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
