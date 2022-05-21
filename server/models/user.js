import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
});

//Export model
export default mongoose.model('User', UserSchema);