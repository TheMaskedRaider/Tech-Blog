const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


//create new post
router.post('/', withAuth, async (req, res) => {
    console.log("creating...")
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log("Created!")
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
