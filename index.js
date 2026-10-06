const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log("Database:", mongoose.connection.name);
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


const cookiePasrser = require('cookie-parser');
app.use(cookiePasrser());

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const router = require('./Routes/LeaguesRouter');

app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000. ctrl^c to quit');
})