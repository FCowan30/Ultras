const express = require('express');
const app = express();

require('dotenv').config();

const cookiePasrser = require('cookie-parser');
app.use(cookiePasrser());

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000. ctrl^c to quit');
})