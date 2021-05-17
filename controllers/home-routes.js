const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {

  try {
    const dbPostData = await Post.findAll({
      attributes: ['id', 'title', 'post_body', 'creation_date'],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {model: User,attributes: ['name']}
      },
      {model: User,attributes: ['name']}
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
     const dbPostData = await Post.findAll({
       where: {
         user_id: req.session.userId.id
       },
       attributes: ['id', 'title', 'post_body', 'creation_date'],
       include: [{model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'creation_date'],
         include: {model: User,attributes: ['name']}
       },
       {model: User,attributes: ['name']}
       ]
     })

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    const userName = req.session.userId.name

    res.render('dashboard', {
      userName,
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
 try {
 const dbPostData = await Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'post_body', 'creation_date',  'user_id'],
    include: [{model: User,attributes: ['name'],},
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'creation_date', 'user_id'],
        include: [{model: User, attributes: ['name'],},
        ],
      },
    ],
  })

  const myPost = dbPostData.get({ plain: true });


const comments = myPost.comments

  res.render('view-post', {
    myPost,
    comments,
    loggedIn: req.session.loggedIn,
  });
  }  catch (err) {
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

router.get('/newpost', (req, res) => {

  res.render('new-post');
});

router.get('/updatepost/:id', async (req, res) => {

  res.render('update-post');
});

module.exports = router;
