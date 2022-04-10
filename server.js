const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'SECRET',
    cookie: {secure: false}
}));

require("./controllers/users-controller")(app);
//require("./controllers/collection-controller")(app);
require("./controllers/comments-controller")(app);
require("./controllers/wiki-art-controller")(app);

app.listen(process.env.PORT || 4000);