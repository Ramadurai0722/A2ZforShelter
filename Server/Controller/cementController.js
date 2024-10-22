const CementPost = require("../models/Cements");

exports.createCementPost = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      shopAddress,
      brand,
      cementType,
      quantity,
      price,
      description,
    } = req.body;

    const images = req.files.map((file) => file.path);

    const cementPost = new CementPost({
      userId,
      name,
      email,
      phoneNumber,
      shopAddress,
      brand,
      cementType,
      quantity,
      price,
      images,
      description,
      category: "cement",
    });

    await cementPost.save();

    res.status(201).json({ message: "Cement post created successfully!" });
  } catch (error) {
    console.error("Error creating cement post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get all Catering Posts
exports.getAllCement = async (req, res) => {
  try {
    const cements = await CementPost.find();
    res.status(200).json(cements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering posts', error });
  }
};


exports.getUserCementData = async (req, res) => {
  // console.log("getuserdata");

  try {
    // Fetch cement based on the extracted userId
    const userId = req.userId

    const cement = await CementPost.find({ userId: userId });


    res.status(200).json(cement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses data" });
  }
};

exports.getCementById = async (req, res) => {
  try {
    const cement = await CementPost.findById(req.params.id);
    if (!cement) {
      return res.status(404).json({ message: 'Cement not found' });
    }
    res.json(cement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.updateCement = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await CementPost.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Cement service not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Cement Item
exports.deleteCement = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await CementPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Cement service not found" });
    }
    res.status(200).json({ message: "Cement service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
