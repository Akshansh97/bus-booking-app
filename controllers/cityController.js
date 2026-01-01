const City = require('../models/City');

// /api/cities

exports.addCity = async (req, res) => {
    try {
        const { name, state } = req.body;

        if (!name || !state) {
            return res.json({ error: "Name and State are required" });
        }

        const city = await City.create({ name, state });
        res.status(201).json({
            message: "City added successfully",
            city
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "City already exists!!" });
        }
        console.error(error);
        res.status(500).send(error);
    }
};

exports.getCities = async (req, res) => {
    try {
        const cities = await City.find().sort({ name: 1 });
        res.send(cities);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};