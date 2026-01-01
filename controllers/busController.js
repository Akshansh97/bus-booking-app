const Bus = require('../models/Bus');

// /api/buses
exports.addBus = async (req, res) => {
    try {
        const {busNumber, totalSeats, busType, operatorName} = req.body;
        if (!busNumber || !totalSeats || !busType || !operatorName) {
            return res.json({error: "Bus Number, Total Seats, Bus Type and Operator Name are required"});
        }
        const bus = await Bus.create({busNumber, totalSeats, busType, operatorName});
        res.status(201).json({
            message: "Bus added successfully",
            bus
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({error: "Bus Number already exists!!"});
        }
        console.error(error);
        res.status(500).send(error);
    }
};
exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find().sort({operatorName: 1});
        res.send(buses);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};