// src/pages/About.jsx
const About = () => (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About This Blog</h1>
  
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        Welcome to our blog, where we connect you with professional services, practical insights,
        and valuable tips from experts in every field — from developers and doctors to tailors and teachers.
      </p>
  
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        Our mission is to empower professionals by providing them with visibility, credibility,
        and access to a wider audience. We aim to make it easier for people to find and connect
        with trusted service providers.
      </p>
  
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        Subscribe today to stay updated and enjoy premium features that enhance your experience
        on the platform.
      </p>
  
      <div className="text-center mt-8">
        <a
          href="/subscribe"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition"
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
  
  export default About;
  