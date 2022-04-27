import collectionDao from "../database/collection/collection-dao.js"

const CollectionsController = (app) => {
    app.get('/api/collection/', findAllInCollection);
    app.get('/api/collection/:user_id', findUserCollection);
    app.get('/api/collection/get', getCollection);
    app.post('/api/collection/', createCollection);
    app.put('/api/collection/add/:user_id', addToCollection);
    app.delete('/api/collection/remove/:user_id/:painting_id', removeFromCollection);
    app.delete('/api/collection/clear', deleteCollection);
    app.put('/api/collection/:user_id', updateCollection);
}

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
    const user_id = req.params['user_id'];
    const item_to_add = req.body;

    // get current collection for user and if not found return error
    let collection_res = await collectionDao.findCollectionById(user_id);
    if (!collection_res) {
        res.sendStatus(400);
        return;
    }

    let original_collection = collection_res.contents;

    // check to see if item already exists in collection
    if (original_collection.findIndex(item => item.id === item_to_add.id) !== -1) {
        res.sendStatus(400)
        return;
    }

    // if not, append the new item to the collection
    original_collection.push(item_to_add);

    const response = await collectionDao.updateCollection(user_id, collection_res)
    if (response.modifiedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

const removeFromCollection = async (req, res) => {
    const user_id = req.params['user_id'];
    const painting_id = req.params["painting_id"];

    // get current collection for user and if not found return error
    let collection_res = await collectionDao.findCollectionById(user_id);

    if (!collection_res) {
        res.sendStatus(400);
        return;
    }

    let original_collection = collection_res.contents;

    // try to find the index of the painting to remove
    const index = original_collection.findIndex(item => item.id === painting_id);
    if ( index === -1 ) {
        res.sendStatus(400)
        return;
    }

    // as long as it is in the array remove it
    original_collection.splice(index, 1);


    const response = await collectionDao.updateCollection(user_id, collection_res)
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

const deleteCollection = async (req, res) => {
    const collection_id = req.params['collection_id'];
    // in the undergrad lecture the prof deleted the comment
    // and then returned the whole list back like below
    await collectionDao.deleteCollection(collection_id);
    const collection = await collectionDao.findAllInCollection();
    res.json(collection);
}

const updateCollection = async (req, res) => {
    const body = req.body;
    const _id = req.body._id;
    const status = await collectionDao.updateCollection(_id, body);
    if (status["modifiedCount"] === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

const findUserCollection = async (req, res) => {
    const user_id = req.params['user_id'];
    const collection = await collectionDao.findCollectionById(user_id)
    if (collection) {
        res.json(collection.contents);
    } else {
        res.sendStatus(404);
    }
}



export default CollectionsController;