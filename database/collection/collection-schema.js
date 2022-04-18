import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

//TODO: I want the collection to be created when a user account is created
const collectionSchema = mongoose.Schema({
    // collection_id created by database
    user_id: String,
    contents:
        {
            "painting_id": String,
            status: {type: String, enum: ['public, private']}
        }
}, {collection: "collection"})

export default collectionSchema;