import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const commentsSchema = mongoose.Schema({
    // comment_id created by database
    user_id: {type: String, required: true},
    username: {type: String, required: true},
    painting_id: {type: String, default: null},
    artist_id: {type: String, default: null},
    comment_date: {type: Date, default: Date.now()},
    type: {type: String, Enum:["artist", "painting"]},
    comment: String
}, {collection: 'comments'});

export default commentsSchema;