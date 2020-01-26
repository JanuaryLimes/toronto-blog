import { mConnection } from '../mongoose';

const BlogSchema = new mConnection.Schema({
  name: String
});

export const Blog = mConnection.model('Blog', BlogSchema);
