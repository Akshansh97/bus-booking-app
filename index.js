const express = require('express');
const connect = require('./config/db');

const app = express();


//database connection
connect();

//routes
app.use(express.json());
app.use('/api/cities', require('./routes/cityRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/routes', require('./routes/routeRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));

//middlewares
app.use(require('./middlewares/userNotFoundError'));

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});