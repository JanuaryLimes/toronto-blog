import express from 'express';
import { BlogPost } from '../model/blog-post.model';

const router = express.Router();

router.get('/user-blog-posts', (req, res) => {
  const { user } = req;

  // todo: return real data, move to public api

  res.status(200).send({ user, userBlogPosts: ['aaa', 'bbb', 'ddd'] });
});

router.post('/create-new-blog-post', (req, res) => {
  const { title, content, blogName, postDate } = req.body;

  console.log(
    '\n\n',
    'create new blog post',
    '\ntitle: ',
    title,
    '\ncontent: ',
    content,
    '\nblogName: ',
    blogName,
    '\npostDate: ',
    postDate,
    '\n\n'
  );

  // Todo handle req.body validation

  BlogPost.create({ title, content, blogName, postDate }, (err, blogPost) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    console.log('Blog post created: ', blogPost);
    return res.status(200).send({ blogPost });
  });
});

export default router;
