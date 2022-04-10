const collectionDao = require('../../database/collection/collection-dao');
let collection = require('./collection.json'); // TODO: replace with Mongo

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

const addToCollection = (req, res) => {
    let collection = req.session['collection'];
    if(!collection) {
        collection = [];
    }
    const painting_id = req.params['painting_id'];
    collection.push(painting_id);
    req.session['collection'] = collection;
    res.sendStatus(200);
}

const getCollection = (req, res) => {
    const collection = req.session['collection'];
    res.json(collection);
}

const clearCollection = (req, res) => {
    req.session['collection'] = [];
    res.sendStatus(200);
}

module.exports = (app) => {
    app.get('/api/collection/add/:painting_id', addToCollection);
    app.get('/api/collection/get', getCollection);
    app.get('/api/collection/clear', clearCollection);
}