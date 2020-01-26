import { BlogPopularity } from '../model/blog-popularity.model';

async function getTopBlogs(aCount: string) {
  const count = parseInt(aCount);
  if (isNaN(count)) {
    throw new Error('wrong count parameter, count must be a number');
  }

  const blogs = await BlogPopularity.find({})
    .sort('-viewCount')
    .limit(count)
    .exec();

  console.log('\n\ntop blogs: \n\n', blogs);
  return blogs;
}

export { getTopBlogs };
