export function createUser (req, res){
    res.status(200).json({message:"post created"})
}
export function updateUser  (req, res) {
    res.status(200).json({message:"post updated"})
}
export function deleteUser(req, res){
    res.status(200).json({message:"post deleted"})
}