import express from 'express';

// /api/public/top-blogs
const topBlogsRouter = express.Router();

// /api/public/top-blogs/10
topBlogsRouter.get('/:count', (req, res) => {
  const { count } = req.params;
  // TODO
  console.log('top-blogs');
  return res.status(200).json({ topBlogs: 'top-blogs', count: Number(count) });
});

export { topBlogsRouter };
