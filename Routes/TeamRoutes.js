const express = require('express');
const router = express.Router();

const controller = require('../Controller/TeamController');

router.get('/sync', controller.syncPremierLeagueTeams);

module.exports = router;