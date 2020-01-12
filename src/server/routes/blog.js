import express from 'express';
import { Blog } from '../model/blog.model';
import passport from 'passport';
import { BlogPost } from '../model/blog-post.model';
import { incrementViewCounter } from '../services/blog-popularity';

// /api/public/blogs
const router = express.Router();

router.get('/allblogs', (req, res) => {
  Blog.find({})
    .then(doc => {
      console.log('Sent list of items...');
      res.json(doc);
    })
    .catch(err => {
      console.log('error getting blogs', err);
      res.status(500).json(err);
    });
});

router.post('/blog', (req, res) => {
  console.log('req.body', req.body, req.body.name);
  if (req.body && req.body.name) {
    Blog.create({ name: req.body.name }, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Unable to create blog', err: err });
      } else {
        console.log('result', result);
        res.json(result);
      }
    });
  } else {
    res.status(500).json({ error: 'Unable to create blog' });
  }
});

router.get(
  '/protected-blogs',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user } = req;

    res.status(200).send({ user, arr: [1, 2, 3] });
  }
);

router.get('/:blogName', (req, res) => {
  const { blogName: user } = req.params;

  incrementViewCounter(user);

  BlogPost.find({ blogName: user })
    .sort('-postDate')
    .exec()
    .then(result => {
      console.log('log result of blog name find: ', [...result]);
      return res.status(200).send({ user, userBlogPosts: [...result] });
    })
    .catch(err => {
      console.log('error: ', err);
      return res.status(400).send({ error: err });
    });
});

export default router;
