import collectionDao from "../database/collection/collection-dao.js"

const findAllInCollection = async (req, res) => {
    const collection = await collectionDao.findAllInCollection();
    res.json(collection);
}

const createCollection = async (req, res) => {
    const collection = req.body;
    const status = await collectionDao.createCollection(collection);
    res.send(status);
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

const updateCollection = async (req, res) => {
    console.log("in update collection");
    const body = req.body;
    const _id = req.body._id;
    const status = await collectionDao.updateCollection(_id, body);
    console.log(status);
    if ( status["modifiedCount"] === 1 ){
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

const findUserCollection = async (req, res) => {
    const user_id = req.params['user_id'];
    const collection = await collectionDao.findCollectionById(user_id)
    if ( collection ){
        res.json(collection);
    } else {
        res.sendStatus(404);
    }
}

// TODO, I don't think these should all be get?
const CollectionsController = (app) => {
    app.get('/api/collection/', findAllInCollection);
    app.get('/api/collection/:user_id', findUserCollection);
    app.get('/api/collection/get', getCollection);
    app.post('/api/collection/', createCollection);
    app.get('/api/collection/add/:painting_id', addToCollection);
    app.get('/api/collection/clear', deleteFromCollection);
    app.put('/api/collection', updateCollection);
}

export default CollectionsController;