// src/pages/EditPost.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', category: '' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/posts/${id}`, post);
      navigate(`/posts/${id}`); // Redirect to detail page after update
    } catch (err) {
      console.error('❌ Failed to update post:', err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full p-2 border mb-2"
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
          className="w-full p-2 border mb-2"
          placeholder="Category"
          required
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full p-2 border mb-4 h-32"
          placeholder="Content"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
