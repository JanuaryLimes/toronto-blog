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

export default router;
