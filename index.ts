import * as mongoose from 'mongoose';
import * as bodyParser from "body-parser";
import * as express from "express";
import * as jsonwebtoken from 'jsonwebtoken';

import routes from "./src/routes/userRoute";

const app = express();
const PORT = 4000;

// mongoose connection
mongoose.connect("mongodb://localhost:27017/userdb");

// body parser set up
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


routes(app);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});
