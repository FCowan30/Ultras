const leagueService = require("../Service/LeagueServices");

exports.syncPremierLeague = async function(req, res) {
    try {
        const league = await leagueService.syncLeague(39);

        res.json(league);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to sync league"
        });
    }
};