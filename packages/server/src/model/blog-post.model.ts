import { mConnection } from '../mongoose';

const BlogPostSchema = new mConnection.Schema({
  title: String,
  blogName: String,
  content: String,
  postDate: Date,
  comments: [
    {
      blogPostId: String,
      commentUsername: String,
      commentText: String,
      commentDate: Date,
      asGuest: Boolean
    }
  ]
});

export const BlogPost = mConnection.model('BlogPost', BlogPostSchema);
