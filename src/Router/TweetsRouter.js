import express from 'express';

import {createTweet, deleteTweet, getAllTweets, getTweet, updateTweet} from '../controllers/TweetsController.js';

const router = express.Router();

router.get('/', getAllTweets);
router.get('/:id', getTweet);
router.post('/:id', createTweet);
router.put('/:id', updateTweet);
router.delete('/:id', deleteTweet);

export default router;