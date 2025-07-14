import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://pilgimsblog-1.onrender.com/api';

const PostDetails = () => {
  const { id } = useParams(); // Post ID
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  const fetchPostAndComments = async () => {
    try {
      const postRes = await axios.get(`${API_URL}/posts/${id}`);
      const commentRes = await axios.get(`${API_URL}/comments/${id}`);
      setPost(postRes.data);
      setComments(commentRes.data);
    } catch (err) {
      console.error('❌ Error loading data:', err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/comments`, {
        postId: id,
        author: newComment.author,
        content: newComment.content,
      });
      setNewComment({ author: '', content: '' });
      fetchPostAndComments();
    } catch (err) {
      console.error('❌ Error adding comment:', err);
    }
  };

  const handleEdit = (commentId, content) => {
    setEditingId(commentId);
    setEditedContent(content);
  };

  const handleUpdate = async (commentId) => {
    try {
      await axios.put(`${API_URL}/comments/${commentId}`, {
        content: editedContent,
      });
      setEditingId(null);
      setEditedContent('');
      fetchPostAndComments();
    } catch (err) {
      console.error('❌ Error updating comment:', err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${API_URL}/comments/${commentId}`);
      fetchPostAndComments();
    } catch (err) {
      console.error('❌ Error deleting comment:', err);
    }
  };

  return (
    <div className="container">
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>

      <hr />
      <h3>Comments</h3>

      {comments.map((comment) => (
        <div key={comment._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          <strong>{comment.author}</strong>
          {editingId === comment._id ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(comment._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <button onClick={() => handleEdit(comment._id, comment.content)}>Edit</button>
              <button onClick={() => handleDelete(comment._id)}>Delete</button>
            </>
          )}
        </div>
      ))}

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          required
        />
        <textarea
          placeholder="Write a comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default PostDetails;
