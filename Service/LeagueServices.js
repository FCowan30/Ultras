// fetch League Data
const League = require("../Models/League.");

async function getLeagues(leagueId){
    const response = await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/leagues?id=${leagueId}",
        {
            headers: {
                "X-RapidAPI-Key": process.env.API_KEY
            }
        }
    );
    if (!response.ok) {
        throw new Error(`API requrest failed: ${response.status}`);
    }

    return response.json();
}

async function syncLeague(leagueId) {

    const data = await fetchLeaguefromAPI(leagueId);

    const apieague = data.response[0];

    const leagueData = {
        apiId: apieague.league.id,
        name: apieague.league.name,
        type: apieague.league.type,
        logo: apieague.league.logo,

        country: {
            name: apieague.country.name,
            code: apieague.country.code,
            flag: apieague.country.flag
        }
    };

    await League.updateOne(
        { apiId: leagueData.apiId },
        { $set: leagueData },
        { upsert: true }
    );

    return leagueData;
}

module.exports = {
    getLeagues,
    syncLeague
};