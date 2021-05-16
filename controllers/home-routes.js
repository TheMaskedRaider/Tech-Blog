const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {
  console.log(req.session.user_id)
  try {
   const dbPostData= await Post.findAll({
      attributes: ['id','title','post_body','creation_date'],
      include: [{
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id'],
              include: {
                  model: User,
                  attributes: ['name']
              }
          },
          {
              model: User,
              attributes: ['name']
          }
      ]
  })

  const posts = dbPostData.map((post) => post.get({ plain: true })
  );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {

    const dbPostData= Post.findAll({
      where: {
          user_id: req.session.user_id
      },
      attributes: ['id','title','content','creation_date'],
      include: [{
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'creation_date'],
              include: {
                  model: User,
                  attributes: ['name']
              }
          },
          {
              model: User,
              attributes: ['name']
          }
      ]
  })
    const user = userData.get({ plain: true });
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
