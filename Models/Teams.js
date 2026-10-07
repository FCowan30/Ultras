const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Team', TeamSchema);