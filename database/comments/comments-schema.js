import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    "user_id": String,
    username: String,
    comment: String,
    date: {type: Date, default: Date.now()},
    likes: {type: Number, default: 0}
}, {collection: 'comments'});

export default commentsSchema;