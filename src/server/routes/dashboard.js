import express from 'express';

const router = express.Router();

router.get('/user-blog-posts', (req, res) => {
  const { user } = req;

  res.status(200).send({ user, userBlogPosts: ['aaa', 'bbb', 'ddd'] });
});

export default router;
