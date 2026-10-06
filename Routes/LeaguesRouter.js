const express = require('express');
const router = express.Router();
const controller = require('../Controllers/LeaguesController');

router.get('/', controller.getLeagues);