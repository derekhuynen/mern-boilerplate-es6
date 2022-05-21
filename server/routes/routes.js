import {usersRouter} from "./users.js";
import path from "path";
import {fileURLToPath} from "url";
import express from "express";

export default function Routes(app){

    //Set __dirname Path
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    //Initialize Static Files
    app.use(express.static(path.join(__dirname, '../../client/build')));

    //Direct to Users API
    app.use('/users', usersRouter);

    //Allow React to Control Other URLs
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '../../client/build/index.html'))
    })
}