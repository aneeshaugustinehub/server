import express from 'express';
import { createUser,updateUser,deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Hello from user Router');
});
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;