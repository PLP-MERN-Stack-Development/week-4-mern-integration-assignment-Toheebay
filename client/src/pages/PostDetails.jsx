import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/posts/${id}`),
          axios.get(`http://localhost:5000/api/comments/post/${id}`)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
        setError('');
      } catch (err) {
        console.error('❌ Failed to fetch post or comments:', err.message);
        setError('❌ Failed to load post or comments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/comments', {
        postId: id,
        author,
        content // ✅ send as "content" to match backend
      });

      const res = await axios.get(`http://localhost:5000/api/comments/post/${id}`);
      setComments(res.data);
      setAuthor('');
      setContent('');
      setError('');
    } catch (err) {
      console.error('❌ Failed to post comment:', err.message);
      setError('❌ Failed to post comment. Please try again.');
    }
  };

  if (loading) return <p className="text-center">⏳ Loading post...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>
      <p className="text-gray-600 mb-1">Category: {post?.category || 'Uncategorized'}</p>
      <p className="mb-4">{post?.content}</p>

      {post?.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="Post"
          className="w-full rounded mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
          }}
        />
      )}

      {/* Comment Form */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Leave a Comment</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border p-2 rounded"
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>

      {/* Comment List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment._id} className="border-t py-2">
            <p className="text-sm text-gray-800 font-semibold">{comment.author}</p>
            <p className="text-gray-700">{comment.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
