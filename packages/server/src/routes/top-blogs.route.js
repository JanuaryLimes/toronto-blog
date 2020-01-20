import express from 'express';
import { getTopBlogs } from '../services/top-blogs';

// /api/public/top-blogs
const topBlogsRouter = express.Router();

// /api/public/top-blogs/10
topBlogsRouter.get('/:count', async (req, res) => {
  const { count } = req.params;

  try {
    const topBlogs = await getTopBlogs(count);
    return res.status(200).json({ topBlogs });
  } catch (error) {
    console.log('error: ', error.message);
    return res.status(400).json({ error: error.message });
  }
});

export { topBlogsRouter };
