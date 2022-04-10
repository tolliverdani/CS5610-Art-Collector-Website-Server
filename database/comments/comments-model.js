const mongoose = require('mongoose');
const commentsSchema = require('./comments-schema');
const commentsModel = mongoose.model(
    "CommentsModel",
    commentsSchema);
module.exports = commentsModel;