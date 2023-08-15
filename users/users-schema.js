import { Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
  },
  { collection: 'users' }
);

export default usersSchema;
