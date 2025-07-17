import { useState, useEffect } from 'react';
import { createPost, getCategories } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log('📦 Categories:', res.data); // Debug log
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('❌ Error fetching categories:', err.message);
        alert('Failed to load categories');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createPost({
        title,
        content,
        categories: selectedCategories,
        image,
      });
      console.log('✅ Post created:', res.data);
      navigate(`/posts/${res.data._id}`); // ✅ Navigate to PostDetail page
    } catch (err) {
      console.error('❌ Failed to create post:', err.response?.data || err.message);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={cat.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, e.target.value]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== e.target.value));
                  }
                }}
              />
              {cat.name}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
