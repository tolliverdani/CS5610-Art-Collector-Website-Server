const mongoose = require('mongoose')
const usersSchema = require('./users-schema.js')

const usersModel = mongoose.model('UsersModel', usersSchema)

module.exports = usersModel