import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
    // TODO: confirm that these are the fields we want to track for this
    //  Should this automatically be created with a user and get linked?
    //  Or should we keep this data under the user?
    user_id: String,
    username: {type: String, required: true},
    paintings: {type: [String], default: []},
}, {collection: "collection"})

export default collectionSchema;