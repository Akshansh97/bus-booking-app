//delete all trips
const connect = require('./config/db');
connect();

const Trip = require('../models/Trip');
Trip.deleteMany({}).then(() => console.log('Trips deleted'));

deleteAllTrips();