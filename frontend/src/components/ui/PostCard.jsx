import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/post/${post._id}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {(post.body || "").substring(0, 120)}{(post.body || "").length > 120 ? "..." : ""}
        </p>
        <div className="text-sm text-gray-500">
          <span>By {post.author?.name || "Unknown"}</span> •{" "}
          <span>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
