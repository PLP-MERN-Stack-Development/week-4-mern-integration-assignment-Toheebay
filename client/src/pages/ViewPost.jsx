import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost, updatePost } from "../services/api";
import PostForm from "../components/PostForm";

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPost(id).then((res) => setPost(res.data)).catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    await deletePost(id);
    navigate("/");
  };

  const handleUpdate = async (updatedData) => {
    await updatePost(id, updatedData);
    setEditMode(false);
    setPost({ ...post, ...updatedData });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      {editMode ? (
        <div>
          <h2>Edit Post</h2>
          <PostForm initialData={post} onSubmit={handleUpdate} />
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: "10px" }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
