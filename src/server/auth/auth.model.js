import { mConnection } from '../mongoose';

const UserSchema = new mConnection.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    dropDups: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

export const User = mConnection.model('User', UserSchema);
