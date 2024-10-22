const Engineer = require('../models/Civil');


exports.createEngineer = async (req, res) => {
  try {
    const engineer = new Engineer({
      ...req.body,
      category: "civil", 
    });
    await engineer.save();
    res.status(201).json(engineer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all engineers
exports.getAllEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.json(engineers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get engineer by ID
exports.getEngineerById = async (req, res) => {
  try {
    const engineer = await Engineer.findById(req.params.id);
    if (!engineer) return res.status(404).json({ message: 'Engineer not found' });
    res.json(engineer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update engineer by ID
exports.updateEngineer = async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!engineer) return res.status(404).json({ message: 'Engineer not found' });
    res.json(engineer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete engineer by ID
exports.deleteEngineer = async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndDelete(req.params.id);
    if (!engineer) return res.status(404).json({ message: 'Engineer not found' });
    res.json({ message: 'Engineer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
