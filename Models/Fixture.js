// Store Fixture data

const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({

    apiId: {
        type: Number,
        required: true,
        unique: true
    },

    leagueId: {
        type: Number,
        required: true
    },

    season: {
        type: Number
    },

    round: {
        type: String
    },

    date: {
        type: Date
    },

    timestamp: {
        type: Number
    },

    status: {
        long: String,
        short: String,
        elapsed: Number
    },

    venue: {
        apiId: Number,
        name: String,
        city: String
    },

    homeTeam: {
        apiId: Number,
        name: String,
        logo: String,
        winner: Boolean
    },

    awayTeam: {
        apiId: Number,
        name: String,
        logo: String,
        winner: Boolean
    },

    goals: {
        home: Number,
        away: Number
    },

    score: {
        halftime: {
            home: Number,
            away: Number
        },

        fulltime: {
            home: Number,
            away: Number
        },

        extratime: {
            home: Number,
            away: Number
        },

        penalty: {
            home: Number,
            away: Number
        }
    }

});

module.exports = mongoose.model('Fixture', fixtureSchema);