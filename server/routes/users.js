import express from 'express'
import UserController from "../controllers/UserController.js";
import bodyParser from "body-parser";
const router = express.Router();
const jsonParser = bodyParser.json()

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


//Basic CRUD
router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', jsonParser, UserController.createOne);
router.delete('/:id', UserController.deleteOne);
router.put('/:id', UserController.updateOne);
router.put('/:id/true', UserController.findOneAndUpdate);


export {router as usersRouter}
