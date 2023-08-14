import * as usersDao from './users-dao.js';

const UserController = app => {
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:id', findUserById);
  app.post('/api/users', createUser);
  app.delete('/api/users/:id', deleteUser);
  app.put('/api/users/:uid', updateUser);
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  const status = await usersDao.updateUser(id, req.body);
  const user = await usersDao.findUserById(id);
  if (user) req.session['currentUser'] = user;
  res.json(user).sendStatus(status ? 200 : 400);
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const status = await usersDao.deleteUser(id);
  if (status && req.session['currentUser']._id === id) {
    req.session.destroy();
  }
  res.json(status ? 200 : 404);
};
const createUser = async (req, res) => {
  const newUser = await usersDao.createUser(req.body);
  res.status(newUser ? 200 : 400).json(newUser);
};
const findUserById = async (req, res) => {
  const id = req.params.id;
  const user = await usersDao.findUserById(id);
  res.json(user);
};
const findAllUsers = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username && password) {
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else if (username) {
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    const users = await usersDao.findAllUsers();
    res.json(users);
  }
};

export default UserController;
