import Mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await Mongoose.connect('mongodb://db-auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
  }

  console.log('Connected to auth MongoDB');

  app.listen(4000, () => {
    console.log('Listening on 4000');
  });
};

start();
