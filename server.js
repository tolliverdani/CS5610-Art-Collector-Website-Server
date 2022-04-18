import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors";

import UsersController from "./controllers/users-controller.js";
//import CollectionController from "./controllers/collection-controller.js";
import CommentsController from "./controllers/comments-controller.js";
import WikiArtController from "./controllers/wiki-art-controller.js";
import SessionController from "./controllers/session-controller.js";
const app = express();

const CONNECTION_STRING = (process.env.DB_CONNECTION_STRING ||
    "mongodb+srv://web-dev-project-admin:uxp4pxn-WHF5zge0pcg@cluster0.oslvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connect(CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // needs HTTPS
}));

UsersController(app);
CommentsController(app);
WikiArtController(app);
SessionController(app);
//CollectionController(app);

app.listen(process.env.PORT || 4000);