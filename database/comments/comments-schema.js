const mongoose = require('mongoose');
const commentsSchema = mongoose.Schema(
    {
        comment: String,
        likes: {type: Number, default: 0}
    },
    {collection: 'comments'});
module.exports = commentsSchema;