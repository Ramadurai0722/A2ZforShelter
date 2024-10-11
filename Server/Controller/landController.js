const Land = require("../models/land");

const createLand = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);
        
        const { userId, status, listedBy, landArea, facing, projectName, description, price, location, name, phoneNumber, purpose, facilities, stateName, districtName, cityName } = req.body;

        const photos = req.files ? req.files.map(file => file.path) : [];
        const landAd = new Land({
            userId,
            status,
            listedBy,
            landArea,
            facing,
            projectName,
            description,
            price,
            location,
            name,
            phoneNumber,
            purpose,
            facilities,
            stateName,
            districtName,
            cityName,
            photos
        });
        await landAd.save();
        res.status(201).json({ message: "Land ad created successfully", landAd });
    } catch (error) {
        console.error("Error in createLand:", error);
        res.status(500).json({ message: "Failed to create land ad", error: error.message });
    }
};


const getAllLands = async (req, res) => {
    try {
        const lands = await Land.find();
        res.status(200).json(lands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch lands", error: error.message });
    }
};

const getLandById = async (req, res) => {
    try {
        const { id } = req.params;
        const land = await Land.findById(id);
        if (!land) {
            return res.status(404).json({ message: "Land not found" });
        }
        res.status(200).json(land);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch land", error: error.message });
    }
};

const getLandsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const lands = await Land.find({ userId });
        res.status(200).json(lands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch lands for user", error: error.message });
    }
};

const updateLand = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (req.files) {
            const photos = req.files.map(file => file.path);
            updatedData.photos = photos; 
        }
        const updatedLand = await Land.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedLand) {
            return res.status(404).json({ message: "Land not found" });
        }

        res.status(200).json({ message: "Land updated successfully", updatedLand });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update land", error: error.message });
    }
};

const deleteLand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLand = await Land.findByIdAndDelete(id);
        if (!deletedLand) {
            return res.status(404).json({ message: "Land not found" });
        }
        res.status(200).json({ message: "Land deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete land", error: error.message });
    }
};

module.exports = {
    createLand,
    getAllLands,
    getLandById,
    getLandsByUserId,
    updateLand,
    deleteLand,
};
