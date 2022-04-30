import userDao from "../database/users/users-dao.js";
import collectionDao from "../database/collection/collection-dao.js";

const authController = (app) => {
    app.post("/api/auth/login", login);
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.put("/api/auth/profile", updateCurrentUserProfile)
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

        // check to see if the user already has a collection, which they shouldn't
        const exisitingCollection = await collectionDao.findCollectionById(insertedUser._id);

        // if they do, return an error
        if ( exisitingCollection ) {
            res.sendStatus(403);

        } else {

            // if not, add their collection
            const newCollection = await collectionDao.createCollection(
                {user_id: insertedUser._id}
            )

            // add attribute to user profile
            insertedUser.collection_id = newCollection._id;
            const status = await userDao.updateUser(insertedUser._id, insertedUser)

            if ( status.modifiedCount !== 1 ) {
                res.sendStatus(403)
            }
        }

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
        res.json(user);
    } else {
        res.sendStatus(403)
    }
}

const updateCurrentUserProfile = async (req, res) => {
    const user = req.body;
    const userId = user._id;
    const status = await userDao.updateUser(userId, user)
    if (status.modifiedCount === 1) {
        user.password = ''
        req.session[`profile`] = user;
        res.sendStatus(200)
    }
}

export default authController;