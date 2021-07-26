import Mongoose from 'mongoose';

import { Password } from '../services/password';

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends Mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends Mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const UserSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    collection: 'users',
  }
);

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = Mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };
