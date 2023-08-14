import { Schema } from 'mongoose';

const schema = new Schema(
  {
    tuit: { type: String, required: true },
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    dislikes: { type: Number, default: 0 },
    disliked: { type: Boolean, default: false },
    replies: { type: Number, default: 0 },
    retuits: { type: Number, default: 0 },
    topic: { type: String, required: true },
    userName: { type: String, required: true },
    handle: { type: String, required: true },
    time: { type: Date, default: () => new Date() },
    image: { type: String, required: true },
    title: { type: String, required: true },
  },
  { collection: 'tuits' }
);

export default schema;
