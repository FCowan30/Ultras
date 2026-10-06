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

module.exports = {
    getLeagues
};