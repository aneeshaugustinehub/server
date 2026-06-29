import User from '../models/User.js';

export async function getUser(req, res) {
  try {
    const Id = req.params.id
    const user = await User.findOne({userId: Id})
    if (!user) {
      return res.status(404).json(
          {success: false, message: `User with ID '${userId}' not found.`});
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('error in getUser', error)
    res.status(500).json({message: 'internal server error'})
  }
}
export async function createUser(req, res) {
  try {
    const {userId, createdAt, name, email, token} = req.body
    const newUser = new User({userId, createdAt, name, email, token});
    await newUser.save()
    res.status(200).json({message: 'user created'})
  } catch (error) {
    console.error('error in createUser', error)
    res.status(500).json({message: 'internal server error', error})
  }
}
export async function updateUser(req, res) {
  try {
    const {
      userId,
      name,
      email,
      bio,
      age,
    } = req.body;
    const updateUser = await User.findByIdAndUpdate(
        req.params.id, {
          userId,
          name,
          email,
          bio,
          age,
        },
        {new: true});
    if (!updateUser) {
      return res.status(404).json({message: 'user not found'})
    }
    res.status(200).json(updateUser)
  } catch (error) {
    console.error('error in updateUser', error)
    res.status(500).json({message: 'internal server error'})
  }
}
export async function deleteUser(req, res) {
  try {
    const DeleteUser = await User.findByIdAndDelete(req.params.id)
    if (!DeleteUser) return res.status(404).json({message: 'user not found'})

    res.status(200).json({message: 'user deleted'})

  } catch (error) {
    console.error('error in deleteUser', error)
    res.status(500).json({message: 'internal server error'})
  }
}