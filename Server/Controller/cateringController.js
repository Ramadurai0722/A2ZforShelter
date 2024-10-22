const Catering = require('../models/Catering');

exports.createCatering = async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            phoneNumber,
            shopAddress,
            meals,
            menuCatalogues,
            numberOfPeople,
            price,
            description,
        } = req.body;

        const images = req.files.map((file) => file.path);

        const cateringPost = new Catering({
            userId,
            name,
            email,
            phoneNumber,
            shopAddress,
            meals,
            menuCatalogues,
            numberOfPeople,
            price,
            description,
            images,
            category: 'catering', 
        });

        const savedPost = await cateringPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating catering post', error });
    }
};


// Get all Catering Posts
exports.getAllCateringPosts = async (req, res) => {
    try {
        const cateringPosts = await Catering.find();
        res.status(200).json(cateringPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching catering posts', error });
    }
};



exports.getUserCateringData = async (req, res) => {
    // console.log("getuserdata");

    try {
        // Fetch catering based on the extracted userId
        const userId = req.userId

        const catering = await Catering.find({ userId: userId });
        //   console.log(houses);

        res.status(200).json(catering);
    } catch (error) {
        res.status(500).json({ message: "Error fetching houses data" });
    }
};


exports.getCateringById = async (req, res) => {
    try {
        const catering = await Catering.findById(req.params.id);
        if (!catering) {
            return res.status(404).json({ message: 'Catering service not found' });
        }
        res.json(catering);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



// Update Catering Item
exports.updateCatering = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCatering = await Catering.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCatering) {
            return res.status(404).json({ message: "Catering service not found" });
        }
        res.status(200).json(updatedCatering);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Catering Item
exports.deleteCatering = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCatering = await Catering.findByIdAndDelete(id);
        if (!deletedCatering) {
            return res.status(404).json({ message: "Catering service not found" });
        }
        res.status(200).json({ message: "Catering service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
