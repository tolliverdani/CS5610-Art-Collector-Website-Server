import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    joined: Date,
    ratings: [Number],
    collection: [String],
}, {collection: "users"})

export default usersSchema;