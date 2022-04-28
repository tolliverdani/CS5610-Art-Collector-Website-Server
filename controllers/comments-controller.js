import CommentsDao from "../database/comments/comments-dao.js";

const commentController = (app) => {
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.put('/api/comments/:cid', updateComment);
    app.delete('/api/comments/:cid', deleteComment);
    app.delete('/api/comments/', deleteComments);
    app.get('/api/comments/painting/:p_id', findCommentsByPaintingId)
    app.get('/api/comments/artist/:a_id', findCommentsByArtistId)
}

const findCommentsByPaintingId = async (req, res) => {
    const painting_id = req.params.p_id;
    const comments = await CommentsDao.findAllCommentsByPaintingId(painting_id)
    res.json(comments)
}

const findCommentsByArtistId = async (req, res) => {
    const artist_id = req.params.a_id;
    const comments = await CommentsDao.findAllCommentsByArtistId(artist_id)
    res.json(comments)
}

const createComment = async (req, res) => {
    const newComment = req.body;
    const insertedComment = await CommentsDao.createComment(newComment);
    res.json(insertedComment);
}

const findAllComments = async (req, res) => {
    const comments = await CommentsDao.findAllComments();
    res.json(comments);
}

const updateComment = async (req, res) => {
    const commentIdToUpdate = req.params.cid;
    const updatedComment = req.body;
    const status = await CommentsDao.updateComment(commentIdToUpdate, updatedComment);
    if (status.acknowledged === true) {
        res.sendStatus(200)
    }
}

const deleteComment = async (req, res) => {
    const commentIdToDelete = req.params.cid;
    const status = await CommentsDao.deleteComment(commentIdToDelete);
    if (status.acknowledged === true) {
        res.sendStatus(200)
    }
}

const deleteComments = async (req, res) => {
    const status = await CommentsDao.deleteComments();
    if (status.acknowledged === true) {
        res.sendStatus(200)
    }
}


export default commentController;