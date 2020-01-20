import express from 'express';
import { BlogPost } from '../model/blog-post.model';

const router = express.Router();

router.post('/create-new-blog-post', async (req, res) => {
  const { title, content, blogName } = req.body;

  if (!title || !content || !blogName) {
    return res.status(400).send({
      error: 'Unable to create blog post'
    });
  }

  const newBlogPost = {
    title,
    content,
    blogName,
    postDate: Date.now()
  };

  try {
    const result = await BlogPost.create(newBlogPost);
    console.log('Blog post created: ', result);
    return res.status(201).send({ blogPost: result });
  } catch (error) {
    console.log('error creating blog post: ', error);
    return res.status(400).send({ error });
  }
});

export default router;
