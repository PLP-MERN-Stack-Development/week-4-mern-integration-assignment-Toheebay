import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postRes = await axios.get(`https://week-4-mern-integration-assignment-uhy7.onrender.com/api/posts/${id}`);
        const commentsRes = await axios.get(`https://week-4-mern-integration-assignment-uhy7.onrender.com/api/comments/post/${id}`);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('❌ Failed to fetch post or comments:', err.message);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!text || !author) return;

    try {
      const res = await axios.post('https://week-4-mern-integration-assignment-uhy7.onrender.com/api/comments', {
        postId: id,
        text,
        author,
      });
      setComments([...comments, res.data]);
      setText('');
      setAuthor('');
    } catch (err) {
      console.error('❌ Failed to submit comment:', err.message);
    }
  };

  if (!post) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">By {post.author} — {new Date(post.createdAt).toLocaleDateString()}</p>
      {post.image && (
        <img
          src={`https://week-4-mern-integration-assignment-uhy7.onrender.com${post.image}`}
          alt="Post"
          className="w-full h-auto rounded-lg shadow mb-6"
        />
      )}
      <p className="text-lg text-gray-700 mb-6">{post.content}</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 mb-4">No comments yet.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li key={comment._id} className="bg-gray-100 p-4 rounded">
              <p className="font-medium text-gray-800">{comment.author}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCommentSubmit} className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          required
        />
        <textarea
          placeholder="Your comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default ViewPost;
