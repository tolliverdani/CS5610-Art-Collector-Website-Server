import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const commentsSchema = mongoose.Schema({
    // comment_id created by database
    user_id: String,
    username: String,
    comment: String,
    post_date: {type: Date, default: Date.now()},
    likes: {type: Number, default: 0}
}, {collection: 'comments'});

export default commentsSchema;