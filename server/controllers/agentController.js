const Agent = require('../models/Agent');

exports.getSubscribedAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ isSubscribed: true });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch agents' });
  }
};

exports.createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ message: 'Error creating agent' });
  }
};
