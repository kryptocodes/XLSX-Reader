const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    Name: {
        type: String,
    },
    Mobile: {
        type: Number,
    },
    Age: {
        type: Number,
    }

},{timestamps:true})




module.exports = mongoose.model("User",userSchema)