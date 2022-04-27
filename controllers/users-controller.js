import userDao from "../database/users/users-dao.js";
import collectionDao from "../database/collection/collection-dao.js";
import express from "express";

const usersController = (app) => {
    app.use(express.json());
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:id', findUserById);
    app.get('/api/users/email/:email', findUserByEmail);
    app.put('/api/users', updateUser);
    app.delete('/api/users/:user_id', deleteUser);
}

const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers()
    res.json(users)
}

const findUserById = async (req, res) => {
    const userId = req.params['id']
    const user = await userDao.findUserById(userId)
    if (user) {
        user.password = "";
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}

const findUserByEmail = async (req, res) => {
    const email = req.params.email
    const user = await userDao.findUserByEmail(email)
    if (user) {
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}


const updateUser = async (req, res) => {
    const user = req.body;
    const userId = user._id;
    const status = await userDao.updateUser(userId, user)
    if (status.acknowledged === true) {
        res.sendStatus(200)
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.user_id
    const user = findUserById(userId)
    // must delete the collection from the user when deleting a user
    const status_collection = await collectionDao.deleteCollection(user.collection_id)
    const status_user = await userDao.deleteUser(userId)
    if (status_collection.acknowledged === true && status_user === true) {
        res.sendStatus(200)
    }
}

export default usersController;