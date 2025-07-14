import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // ✅ Use environment variable with fallback
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseURL}/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('❌ Failed to fetch posts');
      }
    };

    fetchPosts();
  }, [baseURL]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (posts.length === 0) return <p>No posts yet</p>;

  return (
    <div style={{ padding: '1rem' }}>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem' }}>{post.title}</h2>
          <p style={{ marginBottom: '0.5rem' }}>{post.content}</p>
          <p><strong>Author:</strong> {post.author || 'Unknown'}</p>
          <p><strong>Category:</strong> {post.category || 'Uncategorized'}</p>
          {post.image && (
            <img
              src={`${baseURL.replace('/api', '')}${post.image}`}
              alt={post.title}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                marginTop: '1rem',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
