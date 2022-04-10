const mongoose = require('mongoose');
const commentsSchema = mongoose.Schema(
    {
        username: String,
        comment: String,
        date: {type: Date, default: Date.now()},
        likes: {type: Number, default: 0}
    },
    {collection: 'comments'});
module.exports = commentsSchema;