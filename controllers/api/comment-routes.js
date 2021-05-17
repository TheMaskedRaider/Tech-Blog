const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//create new comment
router.post('/', withAuth, async (req, res) => {
    console.log("creating...")
    try {
        console.log(req.session.userId.id,)
        console.log(req.body.post_id)
    const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.userId.id,
        post_id: req.body.post_id,
      })
      console.log("Created!")
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
      console.log(newComment)
    }
  });

  
module.exports = router;
