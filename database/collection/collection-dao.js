import collectionModel from "./collection-model.js";

const findAllInCollection = () => collectionModel.find()

const findCollectionById = (user_id) => collectionModel.findById(user_id)

const createCollection = (collection) => collectionModel.create(collection)

const deleteCollection = (user_id) => collectionModel.deleteOne({_id: user_id})

const updateCollection = (user_id, collection) => collectionModel.updateOne(
    {_id: user_id},
    {$set: collection})

export default {
    findAllInCollection,
    findCollectionById,
    createCollection,
    deleteCollection,
    updateCollection
}
