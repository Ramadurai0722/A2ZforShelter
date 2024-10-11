const SandPost = require("../models/Sand");

exports.createSandPost = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      sellerAddress,
      sandType,
      quantity,
      price,
      description,
    } = req.body;

    const images = req.files.map((file) => file.path);

    const sandPost = new SandPost({
      userId,
      name,
      email,
      phoneNumber,
      sellerAddress,
      sandType,
      quantity,
      price,
      images,
      description,
    });

    await sandPost.save();

    res.status(201).json({ message: "Sand post created successfully!" });
  } catch (error) {
    console.error("Error creating sand post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAllSand = async (req, res) => {
  try {
    const sand = await SandPost.find();
    res.status(200).json(sand);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};

exports.getUserSandData = async (req, res) => {

  try {
    const userId = req.userId

    const sand = await SandPost.find({ userId: userId });


    res.status(200).json(sand);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};


exports.getSandById = async (req, res) => {
  try {
    const sand = await SandPost.findById(req.params.id);
    if (!sand) {
      return res.status(404).json({ message: 'Sand post not found' });
    }
    res.json(sand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSand = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await SandPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Sand service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSand = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await SandPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Sand service not found" });
    }
    res.status(200).json({ message: "Sand service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
