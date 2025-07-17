// src/pages/PostDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getPost,
  deletePost,
  updatePost,
  likePost,
  addComment,
  getComments,
  deleteComment,
  updateComment,
  likeComment,
} from '../api';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')); // Adjust if using context

  const fetchPost = async () => {
    try {
      const res = await getPost(id);
      setPost(res.data);
    } catch (err) {
      setError('Post not found');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getComments(id);
      setComments(res.data);
    } catch (err) {
      console.error('❌ Failed to load comments:', err.message);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleLikePost = async () => {
    try {
      const res = await likePost(id);
      setPost(res.data);
    } catch (err) {
      alert('Failed to like post');
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setLoading(true);
    try {
      await addComment(id, { text: commentText });
      setCommentText('');
      fetchComments();
    } catch (err) {
      alert('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      await updateComment(commentId, { text: editingCommentText });
      setEditingCommentId(null);
      setEditingCommentText('');
      fetchComments();
    } catch (err) {
      alert('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await likeComment(commentId);
      fetchComments();
    } catch (err) {
      alert('Failed to like comment');
    }
  };

  if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;
  if (!post) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        By {post.author || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* ✅ Updated image URL for Render/local */}
      {post.image && (
        <img
          src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/uploads/${post.image}`}
          alt={post.title}
          className="mb-4 w-full max-h-96 object-cover rounded"
        />
      )}

      <div className="text-gray-800 whitespace-pre-line mb-4">{post.content}</div>

      <div className="flex items-center gap-4 mb-4">
        <button onClick={handleLikePost} className="text-blue-600">
          👍 {post.likes?.length || 0}
        </button>
        {user?.username === post.author && (
          <>
            <button
              onClick={() => navigate(`/edit/${post._id}`)}
              className="text-yellow-600 hover:underline"
            >
              ✏️ Edit
            </button>
            <button onClick={handleDeletePost} className="text-red-600 hover:underline">
              🗑 Delete
            </button>
          </>
        )}
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border p-3 rounded bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{comment.username || 'Anonymous'}</p>
                  {editingCommentId === comment._id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full border p-1 rounded"
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                      />
                      <button
                        className="text-green-600 text-sm"
                        onClick={() => handleEditComment(comment._id)}
                      >
                        ✅ Save
                      </button>
                    </div>
                  ) : (
                    <p>{comment.text}</p>
                  )}
                </div>
                <div className="flex gap-2 text-sm">
                  <button onClick={() => handleLikeComment(comment._id)}>
                    👍 {comment.likes?.length || 0}
                  </button>
                  {user?.username === comment.username && (
                    <>
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditingCommentText(comment.text);
                        }}
                      >
                        ✏️
                      </button>
                      <button onClick={() => handleDeleteComment(comment._id)}>🗑</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddComment}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
