import { mConnection } from '../mongoose';

const BlogPopularitySchema = new mConnection.Schema({
  blogName: String,
  viewCount: Number
});

export const BlogPopularity = mConnection.model(
  'BlogPopularity',
  BlogPopularitySchema
);
