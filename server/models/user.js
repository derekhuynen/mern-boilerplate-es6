import mongoose from "mongoose";
import {body, validationResult} from "express-validator";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
});

UserSchema.statics.checkData = function (req) {
    body('firstName', 'FirstName is not Valid.').trim().isLength({min: 1}).escape();
    body('lastName', 'FLast Name is not Valid.').trim().isLength({min: 1}).escape();
    body('age', 'Age is not Valid.').isNumeric();

    return validationResult(req);
};

//Export model
export default mongoose.model('User', UserSchema);