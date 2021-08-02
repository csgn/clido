import Mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  try {
    await Mongoose.connect('mongodb://db-question-mongo-srv:27017/question', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);
  }

  console.log('Connected to question MongoDB');

  app.listen(4002, () => {
    console.log('Listening on 4002');
  });
};

start();
