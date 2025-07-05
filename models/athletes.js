const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url = process.env.Mongo_URI

mongoose.connect(url)

const athleteSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

const athleteModel = mongoose.model('athlete', athleteSchema)

module.exports = athleteModel