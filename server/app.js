import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import Routes from "./routes/routes.js";
import cors from 'cors'
import "dotenv/config";
import mongoose from 'mongoose'

//Create Express App
const app = express();

//Set Port
const port = process.env.SERVER_PORT || '3001';

//Set Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Set Routes
Routes(app);

//Connect to DataBase **Need to Set CONNECTION_STRING in .env**
const url = process.env.CONNECTION_STRING;
await mongoose.connect(url)
    .then(() => {
        console.log("Connected to Database.")
    })
    .catch(err => {
        console.log("DB Connection Error: ", err.message);
        process.exit(1);
    });

//Start Server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

