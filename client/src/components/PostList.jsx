import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // ✅ Use deployed backend URL
  const baseURL = 'https://pilgimsblog-1.onrender.com';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/posts`);
        setPosts(res.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <p>{error}</p>;
  if (posts.length === 0) return <p>No posts yet</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Category:</strong> {post.category}</p>
          {post.image && (
            <img
              src={`${baseURL}${post.image}`}
              alt={post.title}
              style={{ width: '300px', objectFit: 'cover' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
