const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


//create new post
router.post('/', withAuth, async (req, res) => {
    console.log("creating...")
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.userId.id,
      });
      console.log("Created!")
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    console.log("updating...")
    console.log(req.params.id)
    try {
      const updatePost = await Post.update(req.body,{
        where: {
            id: req.params.id
        },

      });
      console.log("updated!")
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(400).json(err);
      console.log(req.body)
    }
  });

  router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
module.exports = router;
