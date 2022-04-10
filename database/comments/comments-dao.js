const commentsModel = require('./comments-model');

const findAllComments = async () => {
    return await commentsModel.find();
}
const createComment = async (newTuit) => {
    return await commentsModel.create(newTuit);
}
const deleteComment = async (tid) => {
    return await commentsModel.deleteOne({_id: tid});
}
const updateComment = async (comment_id, comment) => {
    return await commentsModel.updateOne(
        {_id: comment_id},
        {$set: comment});
}
module.exports = {
    findAllComments, createComment, deleteComment, updateComment
}