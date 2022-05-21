import User from "../models/user.js";
import {body, validationResult} from "express-validator";

export async function findAll (req, res, next) {
    User.find({}, await function(err, doc){
        if (err) {
            return res.status(400).json(printMessage(`Find Items Failed.`, 400, req))
        }
        res.status(200).json({
            Message: printMessage(`Found Items`, 200, req),
            item: doc
        });
    });
}

export async function findOne (req, res, next) {
    User.findById(req.params.id, await function(err, doc){
        if (err) {
            return res.status(400).json(printMessage(`Find Item Failed: ${req.params.id}`, 400, req))
        }
        res.status(200).json({
            Message: printMessage(`Found Item: ${req.params.id}`, 200, req),
            item: doc
        });
    });
}


async function createOne(req, res, next) {

    body('firstName', 'FirstName is not Valid.').trim().isLength({min: 1}).escape();
    body('lastName', 'FLast Name is not Valid.').trim().isLength({min: 1}).escape();
    body('age', 'Age is not Valid.').isNumeric();

    const errors =  await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Message: printMessage(`Invalid Variables`, 400, req), Errors: errors.array()})
    }


    const item = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })

    await item.save(function (err, doc) {
        if (err) {
            console.log(err)
            return res.status(400).json(printMessage(`Failed to Create Item`, 400, req))
        }
        res.status(201).json({
            Message: printMessage(`Item Created`, 200, req),
            item: item
        });
    });
}

// Handle cabin delete on POST.
async function deleteOne(req, res, next) {
    await User.findByIdAndRemove(req.params.id, function(err,doc) {
        if (err) {
            return res.status(400).json(printMessage(`Failed to Delete: ${req.params.id}`, 400, req))
        }
        res.status(200).json({
            Message: printMessage(`Item Deleted: ${req.params.id}`, 200, req),
            item: doc
        });
    });
}



async function updateOne(req, res, next){
    await User.updateOne({ _id: req.params.id }, req.body, function(err,doc) {
        if (err) {
            return res.status(400).json(printMessage(`Failed to Update: ${req.params.id}`, 400, req))
        }
        res.status(200).json({
            Message: printMessage(`Item Update: ${req.params.id}`, 200, req),
            item: doc
        });
    }).clone();
}

async function findOneAndUpdate(req, res, next){
    await User.findOneAndUpdate({ _id: req.params.id }, req.body,{new: true}, function(err,doc) {
        if (err) {
            return res.status(400).json(printMessage(`Failed to Update: ${req.params.id}`, 400, req))
        }
        res.status(200).json({
            Message: printMessage(`Item Update: ${req.params.id}`, 200, req),
            item: doc
        });
    }).clone();
}


export function printMessage(message, status, req){
    return {
        Message: message,
        Status: status,
        url: req.originalUrl,
        Method: req.method,
        Body: req.body}
}


export default {findAll, findOne, createOne, deleteOne, updateOne, findOneAndUpdate}