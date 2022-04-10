const collectionModel = require('./users-model.js')

const findAllCollections = () => collectionModel.find()

const findCollectionById = (user_id) => collectionModel.findById(user_id)

const createCollection = (collection) => collectionModel.create(collection)

const deleteCollection = (user_id) => collectionModel.deleteOne({_id: user_id})

const updateCollection = (user_id, collection) => collectionModel.updateOne(
    {_id: user_id},
    {$set: collection})

module.exports = {
    findAllCollections,
    findCollectionById,
    createCollection,
    deleteCollection,
    updateCollection
}
