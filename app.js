import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import HelloController from './controllers/hello-controller.js';
import UserController from './users/users-controller.js';
import TuitsController from './controllers/tuits/tuits-controller.js';
import AuthController from './users/auth-controller.js';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'cascading cows cross cowardly crows',
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
AuthController(app);
TuitsController(app);
HelloController(app);
UserController(app);
app.listen(process.env.PORT || 4000);
