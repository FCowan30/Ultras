const Fixture = require("../Models/Fixture");


// Fetch fixtures belonging to a league and season
async function fetchFixturesFromAPI(leagueId, season) {

    const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`,
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


// Fetch fixtures and store/update them in MongoDB
async function syncFixtures(leagueId, season) {

    const data = await fetchFixturesFromAPI(leagueId, season);

    console.log("Fixtures returned:", data.response.length);

    const storedFixtures = [];

    for (const item of data.response) {

        const fixtureData = {

            apiId: item.fixture.id,

            leagueId: item.league.id,
            season: item.league.season,
            round: item.league.round,

            date: item.fixture.date,
            timestamp: item.fixture.timestamp,

            status: {
                long: item.fixture.status.long,
                short: item.fixture.status.short,
                elapsed: item.fixture.status.elapsed
            },

            venue: {
                apiId: item.fixture.venue.id,
                name: item.fixture.venue.name,
                city: item.fixture.venue.city
            },

            homeTeam: {
                apiId: item.teams.home.id,
                name: item.teams.home.name,
                logo: item.teams.home.logo,
                winner: item.teams.home.winner
            },

            awayTeam: {
                apiId: item.teams.away.id,
                name: item.teams.away.name,
                logo: item.teams.away.logo,
                winner: item.teams.away.winner
            },

            goals: {
                home: item.goals.home,
                away: item.goals.away
            },

            score: {
                halftime: item.score.halftime,
                fulltime: item.score.fulltime,
                extratime: item.score.extratime,
                penalty: item.score.penalty
            }
        };


        const result = await Fixture.updateOne(
            { apiId: fixtureData.apiId },
            { $set: fixtureData },
            { upsert: true }
        );

        console.log(
            "Fixture:",
            fixtureData.apiId,
            "matched:",
            result.matchedCount,
            "inserted:",
            result.upsertedCount
        );

        storedFixtures.push(fixtureData);
    }

    return storedFixtures;
}


module.exports = {
    fetchFixturesFromAPI,
    syncFixtures
};