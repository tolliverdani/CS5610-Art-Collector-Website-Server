import userModel from "./users-model.js";

const findAllUsers = () => userModel.find().sort({username: 1})
const findUserById = (id) => userModel.findById(id)
const findUserByEmail = (email) => userModel.findOne({email})
const findUserByCredentials = (email, password) => userModel.findOne({email, password})
const createUser = (user) => userModel.create(user)
const deleteUser = (id) => userModel.deleteOne({_id: id})
const updateUser = (id, user) => userModel.updateOne({_id: id}, {$set: user})

export default {
    findAllUsers,
    findUserById,
    findUserByEmail,
    findUserByCredentials,
    createUser,
    deleteUser,
    updateUser
}
