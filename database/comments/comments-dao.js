import commentsModel from "./comments-model.js";

const findAllComments = () => commentsModel.find();
const findAllCommentsByPaintingId = (painting_id) => commentsModel.find(painting_id);
const findCommentById = (comment_id) => commentsModel.findById(comment_id)
const createComment = (comment) => commentsModel.create(comment);
const deleteComment = (comment_id) => commentsModel.deleteOne({_id: comment_id});
const updateComment = (comment_id, comment) => commentsModel.updateOne({_id: comment_id}, {$set: comment});

export default {
    findAllComments,
    findAllCommentsByPaintingId,
    findCommentById,
    createComment,
    deleteComment,
    updateComment
}