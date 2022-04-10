import mongoose from "mongoose";

const collectionSchema = mongoose.Schema(
    // TODO: confirm that these are the fields we want to track for this
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        username: String
    },
    {collection: "users"})

export default collectionSchema;