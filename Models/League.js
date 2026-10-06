//Store league data

const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    apiId:{
        type: Number,
        required: true,
        unique: true
    },

    name:{
        type:String,
        required: true
    },

    country:{
        name: String,
        code: String,
        flag: String
    },

});

module.exports = mongoose.model('League', leagueSchema);