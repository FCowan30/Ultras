const express = require('express');
const router = express.Router();

const controller = require('../Controller/LeaguesController');

router.get('/sync', controller.syncPremierLeague);

module.exports = router;