const PipeWire = require('../models/PipeWire');

// Create a new Pipe & Wire Post
exports.createPipeWirePost = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      sellerAddress,
      Type,
      pipeType,
      pipeBrand,
      pipeDiameter,
      pipeLength,
      wireBrand,
      wireType,
      wireDiameter,
      wireLength,
      quantity,
      price,
      description,
    } = req.body;

    // Handle image upload
    const images = req.files.map((file) => file.path);

    const pipeWirePost = new PipeWire({
      userId,
      name,
      email,
      phoneNumber,
      sellerAddress,
      Type,
      pipeType,
      pipeBrand,
      pipeDiameter,
      pipeLength,
      wireBrand,
      wireType,
      wireDiameter,
      wireLength,
      quantity,
      price,
      description,
      images,
    });

    const savedPost = await pipeWirePost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pipe & wire post', error });
  }
};

exports.getAllPipeWire = async (req, res) => {
  try {
    const pipewires = await PipeWire.find();
    res.status(200).json(pipewires);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};

exports.getUserPipeWireData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch pipewires based on the extracted userId
    const userId = req.userId

    const pipewires = await PipeWire.find({ userId: userId });


    res.status(200).json(pipewires);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getPipeWireById = async (req, res) => {
  try {
    const pipeWire = await PipeWire.findById(req.params.id);
    if (!pipeWire) {
      return res.status(404).json({ message: 'Pipe/Wire product not found' });
    }
    res.status(200).json(pipeWire);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// update Itme
exports.updatePipeWires = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await PipeWire.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Pipe&Wires service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete  Item
exports.deletePipeWires = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await PipeWire.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Pipe&Wires service not found" });
    }
    res.status(200).json({ message: "Pipe&Wires service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
