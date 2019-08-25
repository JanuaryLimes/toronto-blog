import express from 'express';
import { BlogPost } from '../model/blog-post.model';

// /api/public/blog-post
const router = express.Router();

router.get('/id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await BlogPost.findById(id).exec();
    console.log('result by id', result);
    return res.status(200).send({ blogPost: result });
  } catch (error) {
    console.log('error by id', error);
    return res.status(400).send({ error });
  }
});

export default router;
