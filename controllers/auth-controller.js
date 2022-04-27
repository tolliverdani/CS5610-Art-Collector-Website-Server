import userDao from "../database/users/users-dao.js";
import express from "express";
import collectionDao from "../database/collection/collection-dao.js";

const authController = (app) => {
    app.use(express.json());

    app.post("/api/auth/login", login);
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

/* user auth controls */
const signup = async (req, res) => {
    // retrieve contents of the body
    const user = req.body;

    // check to see if they are an existing user based on email in mongo
    const existingUser = await userDao.findUserByEmail(user.email);

    // if they are an existing user, return 403
    if (existingUser) {
        res.sendStatus(403)

        // otherwise, insert user in mongo
        // at the same time, create a collection for that user
    } else {
        const insertedUser = await userDao.createUser(user);
        insertedUser.password = '';
        req.session['profile'] = insertedUser;

        // check to see if the user already has a collection, which they shouldn't
        const exisitingCollection = await collectionDao.findCollectionById(insertedUser._id);

        // if they do, return an error
        if ( exisitingCollection ) {
            res.sendStatus(403);
        } else {

            console.log(`creating a new collection for user with id: ${insertedUser._id}`)

            // if not, add their collection
            const newCollection = await collectionDao.createCollection({user_id: insertedUser._id})

            console.log(`About to append collection_id ${newCollection._id} to the user`)

            // add attribute to user profile
            insertedUser.collection_id = newCollection._id;
            const status = await userDao.updateUser(insertedUser._id, insertedUser)

            if ( status.modifiedCount !== 1 ) {
                res.sendStatus(403)
            }

            console.log(newCollection);
            console.log(insertedUser)
        }

        res.json(insertedUser);
    }
}

const login = async (req, res) => {
    const user = req.body;
    const existingUser = await userDao.findUserByCredentials(user.email, user.password);
    if (existingUser) {
        existingUser.password = '';
        req.session['profile'] = existingUser;
        res.json(existingUser);
    } else {
        res.sendStatus(403);
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const profile = (req, res) => {
    const user = req.session['profile'];
    if (user) res.json(user);
}

export default authController;