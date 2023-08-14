import tuitsModel from './tuits-model.js';

export const findTuits = () => tuitsModel.find().lean();
export const createTuit = tuit =>
  tuitsModel
    .create({
      tuit: tuit.tuit,
      title: tuit.title,
      image: tuit.image,
      topic: tuit.topic,
      userName: tuit.username,
      handle: tuit.handle,
      time: new Date(),
    })
    .then(res => res.toObject())
    .catch(err => {
      console.error(err);
      return null;
    });
export const deleteTuit = tid =>
  tuitsModel.deleteOne({ _id: tid }).then(res => (res.deletedCount === 1 ? tid : null));
export const updateTuit = (tid, tuit) =>
  tuitsModel
    .updateOne({ _id: tid }, { $set: tuit })
    .then(res =>
      res.acknowledged && res.matchedCount === res.modifiedCount
        ? tuitsModel.findById(tid).lean()
        : null
    );
