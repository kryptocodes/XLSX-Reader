const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    Name: {
        type: String,
    },
    Mobile: {
        type: Number,
    }

},{timestamps:true})




module.exports = mongoose.model("Admin",adminSchema)