const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/webdev');

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'SECRET',
    cookie: {secure: false}
}));

require("./controllers/users-controller")(app);
require("./controllers/auth-controller")(app);
require("./controllers/wiki-art-controller")(app);
require("./controllers/collection-controller")(app);
require("./controllers/comments-controller")(app);

app.listen(process.env.PORT || 4000);