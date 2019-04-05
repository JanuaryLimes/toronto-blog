import mongoose from '../mongoose';

let BlogSchema = new mongoose.Schema({
  name: String
});

export const Blog = mongoose.model('Blog', BlogSchema);
