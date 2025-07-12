const PostImage = ({ src, alt }) => {
  const fallback = 'https://via.placeholder.com/600x600?text=No+Image';

  // Use deployed backend URL
  const baseURL = 'https://pilgimsblog-1.onrender.com';

  const imageUrl = src ? `${baseURL}${src}` : fallback;

  return (
    <img
      src={imageUrl}
      alt={alt || 'Post Image'}
      className="w-full h-64 object-cover rounded-lg shadow-md"
      loading="lazy"
    />
  );
};

export default PostImage;
