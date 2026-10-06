const express = require('express');
const router = express.Router();

const controller = require('../Controller/LeaguesController');

router.get('/', controller.getLeagues);

module.exports = router;