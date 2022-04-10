const collectionDao = require('../../database/collection/collection-dao');
/*let collection = require('./collection.json'); // TODO: replace with Mongo

const findAllInCollection = async (req, res) => {
    const collection = await collectionDao.findAllInCollection();
    res.json(collection);
}

const createCollection = async (req, res) => {
    const addition = req.body;
    // in the undergrad lecture the prof added the comment
    // and then returned the whole list back like below
    await collectionDao.createCollection(addition);
    const collections = await collectionDao.findAllCollections();
    res.json(collections);
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

const deleteFromCollection = async (req, res) => {
    const collection_id = req.params['collection_id'];
    // in the undergrad lecture the prof deleted the comment
    // and then returned the whole list back like below
    await collectionDao.deleteComment(collection_id);
    const collection = await collectionDao.findAllComments();
    res.json(collection);
}

module.exports = (app) => {
    app.get('/api/collection/', findAllInCollection);
    app.get('/api/collection/get', getCollection);
    app.post('/api/collection/', createCollection);
    app.get('/api/collection/add/:painting_id', addToCollection);
    app.get('/api/collection/clear', deleteFromCollection);
}/* *///