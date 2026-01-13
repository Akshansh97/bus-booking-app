const express = require('express');
const connect = require('./config/db');
const app = express();
const cors = require('cors');
 
//database connection
connect();

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json());

//routes
app.use('/api/cities', require('./routes/cityRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/routes', require('./routes/routeRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

//middlewares
app.use(require('./middlewares/userNotFoundError'));

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
