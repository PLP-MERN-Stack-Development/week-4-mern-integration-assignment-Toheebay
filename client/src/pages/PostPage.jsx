import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPost } from '../api';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        setError('Failed to load post.');
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      <p style={styles.meta}>Category: <strong>{post.category || 'Uncategorized'}</strong></p>
      <p style={styles.content}>{post.content}</p>

      <div style={styles.actions}>
        <Link to={`/edit/${post._id}`} style={styles.editBtn}>Edit Post</Link>
        {/* You can add a delete button here if needed */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fdfdfd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1.5rem',
  },
  content: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  actions: {
    marginTop: '2rem',
  },
  editBtn: {
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
  },
};

export default PostPage;
