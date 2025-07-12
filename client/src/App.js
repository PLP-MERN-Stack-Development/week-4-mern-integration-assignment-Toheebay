// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import AgentList from './pages/AgentList'; // ✅ New import
import Navbar from './components/Navbar'; // optional, for navigation

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/agents" element={<AgentList />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
