import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setError('');
      } catch (err) {
        console.error('❌ Failed to fetch post:', err.message);
        setError('❌ Failed to load post. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center">⏳ Loading post...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{post?.title}</h1>
      <p className="text-gray-500 mb-1">Category: {post?.category || 'Uncategorized'}</p>
      <p className="text-sm text-gray-400 mb-4">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post?.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="Post"
          className="w-full rounded shadow mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/600x300?text=Image+Unavailable';
          }}
        />
      )}

      <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
        {post?.content}
      </p>
    </div>
  );
};

export default SinglePost;
