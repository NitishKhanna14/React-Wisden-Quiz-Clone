const mongoose = require("mongoose") 

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required:true
    }
})

const player = mongoose.model("Cricketers", schema)

module.exports = player 