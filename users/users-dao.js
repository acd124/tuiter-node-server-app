import usersModel from './users-model.js';

export const findAllUsers = () => usersModel.find().lean();
export const findUserById = id => usersModel.findById(id).lean();
export const findUserByUsername = username => usersModel.findOne({ username }).lean();
export const findUserByCredentials = (username, password) =>
  usersModel.findOne({ username, password }).lean();
export const createUser = user =>
  usersModel
    .create({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    .then(res => res.toObject())
    .catch(err => {
      console.error(err);
      return null;
    });
export const updateUser = (id, user) =>
  usersModel
    .updateOne({ _id: id }, { $set: user })
    .then(res =>
      res.acknowledged && res.matchedCount === res.modifiedCount
        ? usersModel.findById(id).lean()
        : null
    );
export const deleteUser = id =>
  usersModel.deleteOne({ _id: id }).then(res => res.deletedCount === 1);
