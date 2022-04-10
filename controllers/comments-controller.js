const commentsDao = require('../../database/tuits/tuits-dao');
let comments = require('./comments.json'); // TODO: replace with Mongo

const findAllComments = async (req, res) => {
    const comments = await commentsDao.findAllComments();
    res.json(comments);
}

const createComment = async (req, res) => {
    const newComment = req.body;
    // in the undergrad lecture the prof added the comment
    // and then returned the whole list back like below
    await commentsDao.createComment(newComment);
    const comments = await commentsDao.findAllComments();
    res.json(comments);
}

const likeComment = async (req, res) => {
    const comment_id = req.params['comment_id'];
    let comment = await commentsDao.findCommentById(comment_id)
    // in the undergrad lecture the prof liked the comment,
    // updated list, and then returned the whole list back like below
    comment.likes++;
    await commentsDao.updateComment(comment_id, comment)
    const comments = commentsDao.findAllComments()
    res.json(comments);
}

const unlikeComment = async (req, res) => {
    const comment_id = req.params['comment_id'];
    let comment = await commentsDao.findCommentById(comment_id)
    // in the undergrad lecture the prof unliked the comment,
    // updated list, and then returned the whole list back like below
    comment.likes--;
    await commentsDao.updateComment(comment_id, comment)
    const comments = commentsDao.findAllComments()
    res.json(comments);
}

const updateComment = async (req, res) => {
    const comment_id = req.params['comment_id'];
    const updatedComment = req.body;
    const status = commentsDao.updateComment(comment_id, updatedComment);
    res.sendStatus(status);
}

const deleteComment = async (req, res) => {
    const comment_id = req.params['comment_id'];
    // in the undergrad lecture the prof deleted the comment
    // and then returned the whole list back like below
    await commentsDao.deleteComment(comment_id);
    const comments = await commentsDao.findAllComments();
    res.json(comments);
}

module.exports = (app) => {
    app.get('/api/comment', findAllComments);
    app.post('/api/comment', createComment);
    app.put('/api/tuits/:tid/like', likeComment);
    app.put('/api/tuits/:tid/unlike', unlikeComment);
    app.put('/api/comment/:comment_id', updateComment);
    app.delete('/api/comment/:comment_id', deleteComment);
}