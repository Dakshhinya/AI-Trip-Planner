const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require('./config/db');
const userRoute = require('./routes/userRoute');
const tripRoute = require('./routes/tripRoute');
const placeRoute = require('./routes/placeRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/trips', tripRoute);
app.use('/api/places', placeRoute);

app.get('/', (req, res) => {
    res.send('AI Trip Planner API is running...');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
