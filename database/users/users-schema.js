import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const usersSchema = mongoose.Schema({
    // user_id created by database
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    joined: {type: Date, default: Date.now},
    rating: {type: Number, default: 0},
    collection_id: String, // automatically created when user is created
    reviewed_privacy_policy: {type: Boolean, required: true, default: false},
    location: {type: String, required: true, default: ""}
}, {collection: "users"})

export default usersSchema;