import { useEffect, useState } from 'react';
import axios from 'axios';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/agents');
        setAgents(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load agents:', err.message);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">⭐ Subscribed Agents</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading agents...</p>
        ) : agents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow p-4 flex flex-col items-center text-center"
              >
                {agent.image && (
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                )}
                <h3 className="font-semibold text-lg text-gray-800">{agent.name}</h3>
                {agent.company && <p className="text-sm text-gray-600">{agent.company}</p>}
                {agent.website && (
                  <a
                    href={agent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm mt-1"
                  >
                    Visit Website
                  </a>
                )}
                {agent.whatsapp && (
                  <a
                    href={`https://wa.me/${agent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm mt-1"
                  >
                    WhatsApp
                  </a>
                )}
                <span className="text-xs mt-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  {agent.subscriptionType} Plan
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No subscribed agents found.</p>
        )}
      </div>
    </div>
  );
};

export default AgentList;
