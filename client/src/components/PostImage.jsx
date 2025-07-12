const PostImage = ({ src, alt }) => {
  const fallback = 'https://via.placeholder.com/600x400?text=No+Image';
  const baseURL = 'http://localhost:5000'; // 👈 your backend URL

  return (
    <img
      src={src ? `${baseURL}${src}` : fallback}
      alt={alt || 'Post Image'}
      className="w-full h-48 md:h-56 object-cover rounded-lg shadow"
    />
  );
};

export default PostImage;
