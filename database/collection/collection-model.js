const mongoose = require('mongoose')
const collectionSchema = require('./collection-schema')
const collectionModel = mongoose.model(
    'CollectionModel',
    collectionSchema)
module.exports = collectionModel