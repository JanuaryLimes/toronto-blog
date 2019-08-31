import express from 'express';
import { BlogPost } from '../model/blog-post.model';
import { getUserFromRequestJwt } from '../auth/utils';
import { mConnection } from '../mongoose';

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

router.post('/comment/:blogPostId', async (req, res) => {
  const { commentText, commentUsername } = req.body;
  const { blogPostId } = req.params;
  const user = getUserFromRequestJwt(req);
  const loggedUser = !!user && user === commentUsername;

  if (!commentText || !commentUsername || !blogPostId) {
    return res.status(400).send({ error: 'Unable to post comment' });
  }

  const newComment = {
    _id: mConnection.Types.ObjectId(),
    blogPostId,
    commentUsername,
    commentText,
    commentDate: Date.now(),
    asGuest: !loggedUser
  };

  try {
    const query = { _id: blogPostId };
    const update = { $push: { comments: newComment } };
    await BlogPost.findOneAndUpdate(query, update).exec();
    console.log('new comment added: ', newComment);
    return res.status(201).send({ comment: newComment });
  } catch (error) {
    console.log('error posting comment: ', error);
    return res.status(400).send({ error });
  }
});

export default router;
