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

router.post('/comment/:blogPostId', (req, res) => {
  //const { title, content, blogName, postDate } = req.body;

  console.log('req.params', req.params, '\n\n req.body', req.body);

  const ret = {
    'req.params': { ...req.params },
    'req.body': { ...req.body }
  };
  console.log('ret', ret);

  return res.status(200).send(ret);

  // Todo handle req.body validation
  /*
  BlogPost.create({ title, content, blogName, postDate }, (err, blogPost) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    console.log('Blog post created: ', blogPost);
    return res.status(200).send({ blogPost });
  });*/
});

export default router;
