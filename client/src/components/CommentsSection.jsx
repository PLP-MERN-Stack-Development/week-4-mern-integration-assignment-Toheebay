import { useState, useEffect } from 'react';
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
} from '../api';

const CommentsSection = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getComments(postId).then(res => setComments(res.data));
  }, [postId]);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    const res = await addComment(postId, { author: currentUser, content: newComment });
    setComments([res.data, ...comments]);
    setNewComment('');
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    setComments(comments.filter(c => c._id !== id));
  };

  const handleEdit = async (id, content) => {
    const res = await updateComment(id, { content });
    setComments(comments.map(c => (c._id === id ? res.data : c)));
  };

  const handleLike = async (id) => {
    const res = await likeComment(id);
    setComments(comments.map(c => (c._id === id ? res.data : c)));
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </div>

      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-3 rounded mb-2">
          <div className="flex justify-between items-center">
            <strong>{comment.author}</strong>
            <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p className="mt-1">{comment.content}</p>
          <div className="flex gap-3 mt-2">
            <button onClick={() => handleLike(comment._id)}>❤️ {comment.likes}</button>
            {currentUser === comment.author && (
              <>
                <button
                  onClick={() => {
                    const updated = prompt('Edit comment:', comment.content);
                    if (updated) handleEdit(comment._id, updated);
                  }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(comment._id)}>🗑️ Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
