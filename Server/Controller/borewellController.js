const Borewell = require('../models/Borewell');

exports.createBorewell = async (req, res) => {
    try {
        const borewell = new Borewell({
            ...req.body,
            category: "borewell",
        });
        await borewell.save();
        res.status(201).json(borewell);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllBorewells = async (req, res) => {
    try {
        const borewells = await Borewell.find();
        res.status(200).json(borewells);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBorewellById = async (req, res) => {
    try {
        const borewell = await Borewell.findById(req.params.id);
        if (!borewell) return res.status(404).json({ message: 'Borewell not found' });
        res.status(200).json(borewell);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateBorewell = async (req, res) => {
    try {
        const borewell = await Borewell.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!borewell) return res.status(404).json({ message: 'Borewell not found' });
        res.status(200).json(borewell);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBorewell = async (req, res) => {
    try {
        const borewell = await Borewell.findByIdAndDelete(req.params.id);
        if (!borewell) return res.status(404).json({ message: 'Borewell not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
