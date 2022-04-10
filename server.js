import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors";

import UsersController from "./controllers/users-controller.js";
//import CollectionController from "./controllers/collection-controller.js";
import CommentsController from "./controllers/comments-controller.js";
import WikiArtController from "./controllers/wiki-art-controller.js";
const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'SECRET',
    cookie: {secure: false},
    resave: true,
    saveUninitialized: true
}));

UsersController(app);
//CollectionController(app);
CommentsController(app);
WikiArtController(app);

app.listen(process.env.PORT || 4000);