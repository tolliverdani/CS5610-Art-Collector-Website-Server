import collectionModel from "./collection-model.js";

const findAllInCollection = () => collectionModel.find();
const findCollectionById = (user_id) => collectionModel.findOne({user_id: user_id});
const createCollection = (collection) => collectionModel.create(collection);
const deleteFromCollection = (item_id) => collectionModel.deleteOne({_id: item_id});
const deleteCollection = (user_id) => collectionModel.deleteOne({_id: user_id});
const updateCollection = (_id, collection) => collectionModel.updateOne({user_id: _id}, {$set: collection});

export default {
    findAllInCollection,
    findCollectionById,
    createCollection,
    deleteFromCollection,
    deleteCollection,
    updateCollection
}
