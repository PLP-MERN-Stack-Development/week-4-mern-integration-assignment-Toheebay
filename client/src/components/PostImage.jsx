const PostImage = ({ src, alt }) => {
    const fallback = 'https://via.placeholder.com/150x100?text=No+Image';
    const baseURL = 'http://localhost:5000'; // 👈 your backend URL
  
    return (
      <img
        src={src ? `${baseURL}${src}` : fallback}
        alt={alt || 'Post Image'}
        className="w-full h-28 object-cover rounded mb-2"
      />
    );
  };
  
  export default PostImage;
  