import React, { useState, useEffect } from 'react';
// ... other imports
import PostCard from '../components/ui/PostCard.jsx';

// ... rest of your Home.jsx component code

function Home() {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Simulate API call
        // const response = await fetch('/api/posts');
        // const data = await response.json();
        const data = [{ _id: '1', title: 'Post 1' }, { _id: '2', title: 'Post 2' }]; // Example data
        setPosts(data);
      } catch (err) {
        setError(err);
        setPosts([]); // Ensure posts is still an array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error loading posts: {error.message}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

      {/* No need for Array.isArray(posts) check here if initialized as [] */}
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </div>
  );
}

export default Home;
