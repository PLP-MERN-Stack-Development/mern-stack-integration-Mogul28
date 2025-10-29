import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then((res) => {
        const post = res.data;
        setTitle(post.title);
        setBody(post.body);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      if (featuredImage) formData.append("featuredImage", featuredImage);

      if (id) {
        await axios.put(`/api/posts/${id}`, formData);
        toast.success("Post updated!");
      } else {
        await axios.post("/api/posts", formData);
        toast.success("Post created!");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Post" : "Create New Post"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Body</label>
          <textarea
            className="w-full border rounded p-2 h-40"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateEditPost;
