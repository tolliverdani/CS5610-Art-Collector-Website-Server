const userModel = require('./users-model.js')

const findAllUsers = () => userModel.find()

const findUserById = (id) => userModel.findById(id)

const findUserByEmail = (email) => userModel.findOne({email})

const findUserByCredentials = (email, password) => userModel.findOne({email, password})

const createUser = (user) => userModel.create(user)

const deleteUser = (id) => userModel.deleteOne({_id: id})

const updateUser = (id, user) => userModel.updateOne(
    {_id: id},
    {$set: user})

module.exports = {
    findAllUsers, findUserById,
    findUserByEmail, findUserByCredentials,
    createUser, deleteUser, updateUser
}
