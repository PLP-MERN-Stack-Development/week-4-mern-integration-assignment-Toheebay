import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import PostImage from '../components/PostImage';


const POSTS_PER_PAGE = 5;

const STATIC_CATEGORIES = [
  'Electrician', 'Medical', 'Professor', 'Lawyer', 'Engineer',
  'Mechanic', 'Nurse', 'Driver', 'Accountant', 'Developer',
  'Artist', 'Tailor', 'Farmer', 'Chef', 'Teacher',
];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await getPosts();
        setPosts(postRes.data);
        setFilteredPosts(postRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    const filtered = posts.filter(post =>
      post.categories?.includes(categoryName)
    );
    setFilteredPosts(filtered);
  };

  const showAllPosts = () => {
    setFilteredPosts(posts);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-6 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              {selectedCategory ? `Posts in "${selectedCategory}"` : 'All Posts'}
            </h1>
            <Link
              to="/create"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              + Create New Post
            </Link>
          </div>

          {selectedCategory && (
            <button
              onClick={showAllPosts}
              className="mb-4 text-sm text-gray-700 underline hover:text-blue-600"
            >
              Show All Posts
            </button>
          )}

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <ul className="space-y-6">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <li key={post._id} className="border-b pb-4">
                      <PostImage src={post.image} />

                      <Link
                        to={`/posts/${post._id}`}
                        className="text-xl font-semibold text-blue-700 hover:underline block mt-2"
                      >
                        {post.title}
                      </Link>

                      <div className="text-sm text-gray-600 mt-1">
                        Categories:{' '}
                        {post.categories?.map((cat, idx) => (
                          <span
                            key={idx}
                            className="mr-2 inline-block px-2 py-0.5 bg-gray-200 rounded text-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No posts found in this category.</p>
                )}
              </ul>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow border border-gray-200">
          <div>
            <h3 className="text-xl font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              {STATIC_CATEGORIES.map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`block w-full text-left px-3 py-2 rounded transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t pt-4">
            <h4 className="font-bold text-gray-800">ADVERTISEMENT</h4>
            <p className="mt-2 text-sm text-gray-600">
              One of Nigeria’s richest men buried in Saudi Arabia
            </p>
            <p className="text-xs italic text-gray-500">life</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
