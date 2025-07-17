// src/components/PostImage.jsx
import React from 'react';

const PostImage = ({ src }) => {
  if (!src) return null;

  return (
    <img
      src={src}
      alt="Post"
      className="w-full max-h-[400px] object-cover rounded shadow mb-4"
    />
  );
};

export default PostImage;
