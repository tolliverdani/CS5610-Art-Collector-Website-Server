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

const addToCollection = async (req, res) => {
    console.log("in add to collection");
    const user_id = req.params['user_id'];
    const item_to_add = req.body;

    // get current collection for user and if not found return error
    let collection_res = await collectionDao.findCollectionById(user_id);
    console.log(collection_res)
    if ( !collection_res ) {
        res.sendStatus(400);
        return;
    }

    let original_collection = collection_res.contents;
    console.log(original_collection);

    // check to see if item already exists in collection
    if (original_collection.findIndex(item => item.id === item_to_add.id) !== -1 ){
        console.log("item already in user collection");
        res.sendStatus(400)
        return;
    }

    // if not, append the new item to the collection
    original_collection.push(item_to_add);

    const response = await collectionDao.updateCollection(user_id, collection_res)
    console.log(response)
    if (response.modifiedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
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
        res.json(collection.contents);
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
    app.put('/api/collection/add/:user_id', addToCollection);
    app.delete('/api/collection/clear', deleteFromCollection);
    app.put('/api/collection/:user_id', updateCollection);
}

export default CollectionsController;