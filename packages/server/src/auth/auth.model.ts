import { mConnection } from '../mongoose';

const UserSchema = new mConnection.Schema({
  username: {
    type: 'String',
    required: true,
    unique: true,
    index: true
  },
  passwordHash: {
    type: 'String',
    required: true
  }
});

export const User = mConnection.model('User', UserSchema);
