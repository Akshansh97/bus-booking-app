const Route = require('../models/Route');

// /api/routes

exports.addRoute = async (req, res) => {
    try {
        const { fromCity, toCity, distance, duration } = req.body;
        if (!fromCity || !toCity || !distance || !duration) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Prevent adding route from a city to the same city
        if (fromCity === toCity) {
            return res.status(400).json({ error: "From City and To City cannot be the same" });
        }
        const route = await Route.create({ fromCity, toCity, distance, duration });
        res.status(201).json({
            message: "Route added successfully",
            route
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Route already exists!!" });
        }
        console.error(error);
        res.status(500).send(error);
    }
};

exports.getRoutes = async (req, res) => {
    try {
        // Populate fromCity and toCity details
        const routes = await Route.find()
            .populate('fromCity', 'name state')
            .populate('toCity', 'name state')
            .sort({ createdAt: -1 });
        res.send(routes);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};