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
const port = process.env.PORT || '3001';

//Set Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Set Routes
Routes(app);

//connect to DataBase
const url = process.env.CONNECTION_STRING || "mongodb://localhost:27017";
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

