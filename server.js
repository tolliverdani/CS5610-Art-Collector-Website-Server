const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://web-dev-project-admin:MkroyLHYmYn0o6GQ@cluster0.oslvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'SECRET',
    cookie: {secure: false}
}));

require("./controllers/users-controller")(app);
require("./controllers/collection-controller")(app);
require("./controllers/comments-controller")(app);
require("./controllers/wiki-art-controller")(app);

app.listen(process.env.PORT || 4000);