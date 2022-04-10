import commentsModel from "./comments-model.js";

const findAllComments = async () => {
    return await commentsModel.find();
}

const findCommentById = async (comment_id) => {
    return await commentsModel.findById(comment_id)
}

const createComment = async (comment) => {
    return await commentsModel.create(comment);
}

const deleteComment = async (comment_id) => {
    return await commentsModel.deleteOne({_id: comment_id});
}

const updateComment = async (comment_id, comment) => {
    return await commentsModel.updateOne(
        {_id: comment_id},
        {$set: comment});
}

export default {
    findAllComments, findCommentById, createComment, deleteComment, updateComment
}