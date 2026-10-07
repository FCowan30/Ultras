const TeamService = require("../Service/TeamServices");

exports.syncPremierLeagueTeams = async function(req, res) {
    try {

        const teams = await TeamService.syncTeams(39, 2024);

        res.json(teams);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to sync teams"
        });
    }
};