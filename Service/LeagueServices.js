const League = require("../Models/League");


// Get league data from API-Football
async function fetchLeagueFromAPI(leagueId) {

    const response = await fetch(
        `https://v3.football.api-sports.io/leagues?id=${leagueId}`,
        {
            method: "GET",
            headers: {
                "x-apisports-key": process.env.API_KEY
            }
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();

        throw new Error(
            `API request failed: ${response.status} - ${errorBody}`
        );
    }

    return response.json();
}


// Get API data and store/update it in MongoDB
async function syncLeague(leagueId) {

    const data = await fetchLeagueFromAPI(leagueId);

    const apiLeague = data.response[0];

    const leagueData = {
        apiId: apiLeague.league.id,
        name: apiLeague.league.name,
        type: apiLeague.league.type,
        logo: apiLeague.league.logo,

        country: {
            name: apiLeague.country.name,
            code: apiLeague.country.code,
            flag: apiLeague.country.flag
        }
    };

    const result = await League.updateOne(
        { apiId: leagueData.apiId },
        { $set: leagueData },
        { upsert: true }
    );

    console.log("MongoDB update result:", result);

    return leagueData;
}


module.exports = {
    fetchLeagueFromAPI,
    syncLeague
};