import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPost } from '../api';
import axios from 'axios';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch post and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);

        const commentsRes = await axios.get(`/api/comments/post/${id}`);
        setComments(commentsRes.data);
      } catch (err) {
        setError('Failed to load post or comments.');
      }
    };
    fetchData();
  }, [id]);

  // Submit new comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post('/api/comments', {
        postId: id,
        author: 'Anonymous', // Replace with logged-in user later
        content: newComment
      });
      setNewComment('');
      const updated = await axios.get(`/api/comments/post/${id}`);
      setComments(updated.data);
    } catch (err) {
      console.error('Error posting comment:', err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      <p style={styles.meta}>Category: <strong>{post.category || 'Uncategorized'}</strong></p>
      <p style={styles.content}>{post.content}</p>

      <div style={styles.actions}>
        <Link to={`/edit/${post._id}`} style={styles.editBtn}>Edit Post</Link>
      </div>

      {/* Comments Section */}
      <div style={styles.commentSection}>
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} style={styles.commentBox}>
              <p style={styles.commentAuthor}><strong>{comment.author}</strong>:</p>
              <p>{comment.content}</p>
            </div>
          ))
        )}

        {/* Add Comment */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          style={styles.textarea}
        />
        <button onClick={handleCommentSubmit} style={styles.commentBtn}>Post Comment</button>
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
  commentSection: {
    marginTop: '3rem',
  },
  commentBox: {
    border: '1px solid #ccc',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    backgroundColor: '#fafafa',
  },
  commentAuthor: {
    marginBottom: '0.3rem',
    fontWeight: 'bold',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    resize: 'vertical',
  },
  commentBtn: {
    marginTop: '0.5rem',
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PostPage;
