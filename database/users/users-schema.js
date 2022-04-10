import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        username: String
    },
    {collection: "users"})

export default usersSchema;