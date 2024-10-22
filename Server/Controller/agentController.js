const Agent = require('../models/Agent');

exports.createAgent = async (req, res) => {
    console.log("agent");
    
    try {
        const {
            userId,
            firstName,
            lastName,
            email,
            companyName,
            phoneNumber,
            productInterest,
        } = req.body;

        const images = req.files.map((file) => file.path);

        const agent = new Agent({
            userId,
            firstName,
            lastName,
            email,
            companyName,
            phoneNumber,
            productInterest,
            images,
            category: "agents",
        });

        const savedAgent = await agent.save();
        res.status(201).json(savedAgent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating agent', error });
    }
};


exports.getAllAgent = async (req, res) => {
    try {
      const agent = await Agent.find();
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching catering posts', error });
    }
  };

  exports.getAgentById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const agent = await Agent.findById(id); 
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching agent', error });
    }
  };
  