const Trip = require('../models/Trip');

// /api/trips
exports.addTrip = async (req, res) => {
    try {
        const { route, bus, departureTime, arrivalTime, price } = req.body;

        if (!route || !bus || !departureTime || !arrivalTime || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (new Date(departureTime) >= new Date(arrivalTime)) {
            return res.status(400).json({ message: 'Arrival time must be after departure time' });
        }
        const trip = await Trip.create({ route, bus, departureTime, arrivalTime, price });
        res.status(201).json({
            message: 'Trip created successfully',
            trip
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'A trip for this bus at the specified departure time already exists' });
        }
        console.error(error);
        res.status(500).send(error);
    }
};

exports.getTrips = async (req, res) => {
    try {
        // Populate route and bus details with city information
        const trips = await Trip.find()
            .populate({
                path: 'route',
                populate: {
                    path: 'fromCity',
                    select: 'name state'
                }
            })
            .populate({
                path: 'route',
                populate: {
                    path: 'toCity',
                    select: 'name state'
                }
            })
            .populate('bus', 'busNumber busType operatorName');
        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};