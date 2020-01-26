import { BlogPopularity } from '../model/blog-popularity.model';

async function incrementViewCounter(blogName: string) {
  // sleep 2s
  // await new Promise(r => setTimeout(r, 2000));

  const blogPopularityItem: any = await BlogPopularity.findOne({
    blogName
  }).exec();

  // TODO increment only for existing blogs

  if (!blogPopularityItem) {
    await BlogPopularity.create({ blogName, viewCount: 1 });
  } else {
    blogPopularityItem.viewCount = blogPopularityItem.viewCount + 1;
    await blogPopularityItem.save();
  }
}

export { incrementViewCounter };
