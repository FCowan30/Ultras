const express = require('express');
const router = express.Router();

const controller = require('../Controller/FixturesController');

router.get('/sync', controller.syncPremierLeagueFixtures);

module.exports = router;