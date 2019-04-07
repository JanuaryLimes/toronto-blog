import express from 'express';
import { Blog } from '../model/blog.model';

const router = express.Router();

router.get('/api/allblogs', (req, res) => {
  Blog.find({})
    .then(doc => {
      console.log('Sent list of items', doc);
      res.json(doc);
    })
    .catch(err => {
      console.log('error getting blogs', err);
      res.status(500).json(err);
    });
});

router.post('/api/blog', (req, res) => {
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

export default router;
