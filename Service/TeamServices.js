const Team = require("../Models/Teams");


// Fetch teams belonging to a league
async function fetchTeamsFromAPI(leagueId, season) {

    const response = await fetch(
        `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`,
        {
            method: "GET",
            headers: {
                "x-apisports-key": process.env.API_KEY
            }
        }
    );

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
}


// Store/update teams in MongoDB
async function syncTeams(leagueId, season) {

    const data = await fetchTeamsFromAPI(leagueId, season);

    console.log("Teams returned:", data.response.length);

    console.log("Parameters:", data.parameters);
    console.log("Errors:", data.errors);
    console.log("Results:", data.results);
    console.log("Teams returned:", data.response.length);

    const storedTeams = [];

    for (const item of data.response) {

        const teamData = {
            apiId: item.team.id,
            name: item.team.name,
            code: item.team.code,
            country: item.team.country,
            founded: item.team.founded,
            logo: item.team.logo,

            leagueId: leagueId,
            season: season,

            venue: {
                apiId: item.venue.id,
                name: item.venue.name,
                address: item.venue.address,
                city: item.venue.city,
                capacity: item.venue.capacity,
                surface: item.venue.surface,
                image: item.venue.image
            }
        };

        const result = await Team.updateOne(
            { apiId: teamData.apiId },
            { $set: teamData },
            { upsert: true }
        );

        console.log(
            teamData.name,
            "matched:",
            result.matchedCount,
            "inserted:",
            result.upsertedCount
        );

        storedTeams.push(teamData);
    }

    return storedTeams;
}


module.exports = {
    fetchTeamsFromAPI,
    syncTeams
};