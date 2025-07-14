import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  // ✅ Use REACT_APP_API_URL for Create React App
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('category', category);
      if (image) formData.append('image', image);

      const response = await axios.post(`${baseURL}/posts`, formData);
      setMessage('Post created successfully!');
      console.log(response.data);

      // Clear form
      setTitle('');
      setContent('');
      setAuthor('');
      setCategory('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 shadow-md rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        required
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        required
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full mb-3"
        accept="image/*"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default CreatePost;
