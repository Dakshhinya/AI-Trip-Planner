const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { connectRedis } = require('./config/redis');
const dbConfig = require('./config/db');
const tripRoute = require('./routes/tripRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/trips', tripRoute);

app.get('/', (req, res) => {
    res.send('AI Trip Planner API is running...');
});
connectRedis();
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
