import * as express from 'express';
import { UserController } from '../app/controller';
import authPublic from '../utils/authPublic';

let router = express.Router();

router.use(authPublic);

router.get('/findAll', (req, res) => {
  UserController.findAll(req, res)
})

router.get('/findMe', (req, res) => {
  UserController.findMe(req, res)
})

export default router;