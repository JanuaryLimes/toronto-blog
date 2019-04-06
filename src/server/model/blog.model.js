import mongoose from '../mongoose';

const BlogSchema = new mongoose.Schema({
  name: String
});

export const Blog = mongoose.model('Blog', BlogSchema);
