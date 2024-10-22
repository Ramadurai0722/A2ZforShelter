const House = require('../models/House');
const path = require('path');

exports.createHouse = async (req, res) => {
    try {
        const {
            userId, type, bedrooms, bathrooms, furnishing, constructionStatus, listedBy,
            superBuiltupArea, carpetArea, maintenance, totalFloors, floorNo,
            carParking, facing, projectName, adTitle, description, price, location,
            stateName, districtName, cityName, name, phoneNumber, purpose
        } = req.body;

        const photos = req.files ? req.files.map(file => file.path) : [];

        const newHouse = new House({
            userId, type, bedrooms, bathrooms, furnishing, constructionStatus, listedBy,
            superBuiltupArea, carpetArea, maintenance, totalFloors, floorNo,
            carParking, facing, projectName, adTitle, description, price, location,
            stateName, districtName, cityName, name, phoneNumber, photos, purpose,
            category: "house" 
        });

        await newHouse.save();

        res.status(201).json({ message: 'House posted successfully!', house: newHouse });
    } catch (error) {
        console.error('Error creating ad:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};



exports.getHouse = async (req, res) => {
    try {
        const ads = await House.find().sort({ createdAt: -1 }); // Fetch all ads, sorted by newest first
        res.status(200).json(ads);
    } catch (error) {
        console.error('Error fetching ads:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Fetch all House data for a specific user
exports.getUserHouseData = async (req, res) => {
    // console.log("getuserdata");

    try {
        // Fetch houses based on the extracted userId
        const userId = req.userId

        const houses = await House.find({ userId: userId });
        //   console.log(houses);

        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching houses data" });
    }
};


exports.getHouseById = async (req, res) => {
    const { id } = req.params;
    try {
        const house = await House.findById(id);
        if (!house) return res.status(404).json({ message: 'House not found' });
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update Itme
exports.updateHosue = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await House.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "House service not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete  Item
exports.deleteHouse = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await House.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "House service not found" });
        }
        res.status(200).json({ message: "House service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
