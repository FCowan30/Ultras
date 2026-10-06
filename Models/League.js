//Store league data

const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    apiId:{
        type: number,
        required: true,
        unique: true
    },

    name:{
        type:string,
        required: true
    },

    country:{
        name: string,
        code: string,
        flag: string
    },

});

module.exports = mongoose.model('League', leagueSchema);