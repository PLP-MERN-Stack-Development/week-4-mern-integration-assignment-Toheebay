import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const subscribeAgent = async (subscriptionType) => {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');

    if (!name || !email) {
      alert('Name and email are required!');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/agents`, {
        name,
        email,
        subscriptionType,
      });
      alert(`✅ Subscription successful for ${res.data.name}`);
    } catch (err) {
      console.error('❌ Subscription error:', err.message);
      alert('Failed to subscribe. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center">
            🕋 Welcome to the Professionals Hub – A Platform for Muslim Unity & Expertise 🌍
          </h2>
          <div className="text-gray-800 font-medium leading-relaxed flex flex-col gap-4">
            <p className="text-center text-lg font-semibold text-green-700">
              Assalamu Alaikum wa Rahmatullahi wa Barakatuh, dear brothers and sisters!
            </p>
            <p>
              Welcome to the <strong>Professionals Hub</strong>, your trusted gateway to discovering skilled Muslim service providers across a wide range of fields – from artisans to academics, engineers to educators.
            </p>
            <p>
              Just as <strong>Hajj and Umrah</strong> unite Muslims from every nation and background in a sacred journey of purpose, this platform brings us together in the spirit of collaboration, service, and excellence.
            </p>
            <p>
              Whether you’re here to find trustworthy professionals, read insightful posts, or subscribe as an agent to showcase your skills, you are part of a global <strong>ummah</strong> committed to growth and success.
            </p>
            <div>
              <p className="font-semibold text-blue-800 mb-1">🌟 Key Features:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Browse through diverse categories of professionals</li>
                <li>Read real stories, experiences, and posts shared by experts</li>
                <li>Subscribe as an agent to present your service to the world</li>
                <li>Connect with potential clients and collaborate meaningfully</li>
              </ul>
            </div>
            <p className="text-blue-600 font-semibold">
              🌽 Let this be your digital Ihram – a place of intention, honesty, and dedication.
            </p>
            <p>
              Together, with one voice and one vision, we build a better world through trust, talent, and <strong>tawakkul</strong>.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">
                {selectedCategory ? `Posts in "${selectedCategory}"` : 'All Posts'}
              </h1>
              <Link to="/create" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
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

          <aside className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Browse Categories</h3>
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

            <div>
              <h3 className="text-xl font-semibold mb-4">Subscribe as Agent</h3>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Free Plan', color: 'green', price: 'Access limited posts & features', type: 'free' },
                  { title: '1 Month', color: 'yellow', price: '₦1,000 per month', type: 'monthly' },
                  { title: '1 Year', color: 'blue', price: '₦10,000 yearly', type: 'yearly' },
                ].map((plan, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 flex flex-col items-start bg-${plan.color}-50 hover:shadow`}
                  >
                    <h4 className={`font-bold text-lg text-${plan.color}-700`}>{plan.title}</h4>
                    <p className="text-sm text-gray-600">{plan.price}</p>
                    <button
                      onClick={() => subscribeAgent(plan.type)}
                      className={`mt-2 text-sm px-4 py-1 bg-${plan.color}-600 text-white rounded hover:bg-${plan.color}-700`}
                    >
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-800">ADVERTISEMENT</h4>
              <p className="mt-2 text-sm text-gray-600">
                One of Nigeria’s richest men buried in Saudi Arabia
              </p>
              <p className="text-xs italic text-gray-500">life</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
