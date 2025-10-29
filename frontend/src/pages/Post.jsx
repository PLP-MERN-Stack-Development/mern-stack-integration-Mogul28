import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By {post.author?.name || "Unknown"} •{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 whitespace-pre-line">{post.body}</p>

      {/* Comments placeholder */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <p className="text-gray-500">Comments feature coming soon...</p>
      </div>
    </div>
  );
};

export default Post;
