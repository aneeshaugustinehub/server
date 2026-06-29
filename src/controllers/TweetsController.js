import Tweets from '../models/Tweets.js'


export async function getAllTweets(_, res) {
  try {
    const tweets = await Tweets.find().sort({createdAt: -1})
    res.status(200).json({tweets})
    if (!tweets) {
      res.status(404).json({message: 'tweets not available'})
    }
  } catch (error) {
    console.error('error in getAllTweets', error)
    res.status(500).json({message: 'internal server error'})
  }
}
export async function getTweet(req, res) {
  try {
    const id = req.params.id
    const tweets = await Tweets.findOne({postedBy: id})
    res.status(200).json({tweets})
    if (!tweets) {
      res.status(404).json({message: 'tweets not available'})
    }
  } catch (error) {
    console.error('error in getTweet', error)
    res.status(500).json({message: 'internal server error'})
  }
}
// Security Note on req.params.id: Pulling the postedBy ID from the URL
// parameters (e.g., /users/:id/tweets) works, but if you have authentication
// set up, it is generally safer to pull the ID from the authenticated user's
// token (often attached as req.user.id by auth middleware). This prevents a
// user from creating a tweet under someone else's ID by just manipulating the
// URL. If you aren't at the authentication stage yet, your current method is
// perfectly fine for testing!

export async function createTweet(req, res) {
  try {
    const postedBy = req.params.id
    const {description, imagePath} = req.body
    if (!description && !imagePath) {
      return res.status(400).json(
          {message: 'Tweet description or image is required.'});
    }
    const newTweet = new Tweets({postedBy, description, imagePath});
    await newTweet.save()
    res.status(200).json(newTweet)
  } catch (error) {
    console.error('error in createTweet', error)
    res.status(500).json({message: 'internal server error'})
  }
}
export async function updateTweet(req, res) {
  try {
    const postedBy = req.params.id
    const {description, imagePath} = req.body
    if (!description && !imagePath) {
      return res.status(400).json(
          {message: 'Tweet description or image is required.'});
    }
    const updateTweet = await Tweets.findByIdAndUpdate(
        req.params.id, {postedBy, description, imagePath}, {new: true});
      res.status(200).json(updateTweet)
      if (!updateTweet) {
      return res.status(404).json({message: 'Tweet not found'})
      }
  } catch (error) {
    console.error('error in updateTweet', error)
    res.status(500).json({message: 'internal server error'})
  }
}
export async function deleteTweet(req, res) {
  try {
    const DeleteTweet = await Tweets.findByIdAndDelete(req.params.id)
    if (!DeleteTweet) return res.status(404).json({message: 'Tweet not found'})
    res.status(200).json({message: 'Tweet deleted'})
  } catch (error) {
    console.error('error in deleteTweet', error)
    res.status(500).json({message: 'internal server error'})
  }
}
