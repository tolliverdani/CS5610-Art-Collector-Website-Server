const mongoose = require('mongoose');
const commentsSchema = require('./comments-schema');
const commentsModel = mongoose.model("TuitsModel", commentsSchema);
module.exports = commentsModel;