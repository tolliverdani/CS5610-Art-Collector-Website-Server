import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    joined: {type: Date, default: Date.now()},
    ratings: {type: [Number], default: []},
    collection: {type: [String], default: []}
}, {collection: "users"})

export default usersSchema;