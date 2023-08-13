import { Schema } from 'mongoose';

const schema = new Schema(
  {
    tuit: String,
    likes: Number,
    liked: Boolean,
  },
  { collection: 'tuits' }
);

export default schema;
