const FixturesService = require("../Service/FixtureServices");

exports.syncPremierLeagueFixtures = async function(req, res) {
    try {
        const fixtures = await FixturesService.syncFixtures(39, 2024);

        res.json(fixtures);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to sync fixtures"
        });
    }
};