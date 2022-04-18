import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const usersSchema = mongoose.Schema({
    // user_id created by database
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    joined: {type: Date, default: Date.now},
    rating: {type: Number, default: 0},
    collection_id: String,
}, {collection: "users"})

export default usersSchema;