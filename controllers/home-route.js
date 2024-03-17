const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

// Get all posts
router.get('/', async (req, res) => {
  try {
    
    const dbPostData = await Post.findAll({
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['created_at', 'DESC']],  
    })

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    console.log(posts)

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      user_id: req.session.user_id });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a single post
router.get('/post/:id', async (req, res) => {
  try {
        const blogPostData = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                  include: {
                  model: User,
                  attributes: ['username'],
                },
              },
              {
                model: User,
                attributes: ['username'],
              },
          ],
      });
      if (blogPostData) {
        const post = blogPostData.get({ plain: true });
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username, })  
    } else {
        res.status(404).json({ message: 'No post found with this id...'});
        return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/')
    return;
  }
  res.render('login');
  });


router.get('/signup', (req, res) => {
    res.render('signup');
  });


module.exports = router;