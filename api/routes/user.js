import express from 'express';
import { postUser, getAllScore   } from '../controllers/user.js';
const router = express.Router();


//registeration
router.post('/signup', postUser)

//get score
router.get('/score', getAllScore)

export default router;