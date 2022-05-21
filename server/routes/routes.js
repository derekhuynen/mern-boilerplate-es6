import {usersRouter} from "./users.js";
import path from "path";
import {fileURLToPath} from "url";
import express from "express";

export default function Routes(app){

    //Set __dirname Path (only needed for Deployment)
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    //Initialize Static Files (only needed for Deployment)
    app.use(express.static(path.join(__dirname, '../../client/build')));

    //Direct to Users API
    app.use('/users', usersRouter);

    //Allow React to Control Other URLs (Not Tested with react-router-dom)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '../../client/build/index.html'))
    })
}