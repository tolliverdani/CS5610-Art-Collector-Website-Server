import userDao from "../database/users/users-dao.js";
import express from "express";

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

        // otherwise, insert user in mongo, set the password to blank
    } else {
        const insertedUser = await userDao.createUser(user);
        insertedUser.password = '';
        req.session['profile'] = insertedUser;
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
    if (user) {
        res.json(user)
    } else {
        res.sendStatus(403)
    }
}

export default authController;