let comments = require('./comments.json');
const commentsDao = require('../../database/tuits/tuits-dao');

const findAllComments = async (req, res) => {
    const comments = await commentDao.findAllComments();
    res.json(comments);
}

const createNewComment = async (req, res) => {
    const newComment = req.body;
    const insertedComment = await commentDao.createComment(newComment);
    res.json(insertedComment);
}

const deleteComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    const status = await commentsDao.deleteComment(comment_id);
    res.sendStatus(200);
}

const updateComment = async (req, res) => {
    const comment_id = req.params['comment_id'];
    const updatedComment = req.body;
    const status = commentsDao.updateComment(comment_id, updatedComment);
    res.sendStatus(200);
}

module.exports = (app) => {
    app.get('/api/comment', findAllComments);
    app.post('/api/comment', createNewComment);
    app.delete('/api/comment/:comment_id', deleteComment);
    app.put('/api/comment/:comment_id', updateComment);
}