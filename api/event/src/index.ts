import Mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  try {
    await Mongoose.connect('mongodb://db-event-mongo-srv:27017/event', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);
  }

  console.log('Connected to event MongoDB');

  app.listen(4001, () => {
    console.log('Listening on 4001');
  });
};

start();
