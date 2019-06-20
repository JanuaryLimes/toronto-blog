import { mConnection } from '../mongoose';

const BlogPostSchema = new mConnection.Schema({
  title: String,
  blogName: String,
  content: String,
  postDate: Date
});

export const BlogPost = mConnection.model('BlogPost', BlogPostSchema);
