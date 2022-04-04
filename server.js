import express from 'express';
import cors from 'cors';
import paintingsController from "./controllers/wiki-art-controller.js"

const app = express();

app.use(cors());
app.use(express.json());

paintingsController(app);

app.listen(process.env.PORT || 4000);