const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utilities/auth');


router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    
    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })

    const post = postData.get({plain: true});
    const user = postData.user
    
    post.comments = post.comments.split(";")
    
    res.render('single-post', {
      user,
      post,
      loggedIn: req.session.loggedIn,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    
    const user = userData.get({ plain: true });
    
    const posts = user.posts
    
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/create-post', withAuth, async (req, res) => {
  try {
    
    res.render('create-post',{
      loggedIn: req.session.loggedIn,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard/edit-post/:id', withAuth, async (req, res) => {
  try {
    
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })
    
    const post = postData.get({plain: true});
    
    res.render('edit-form', {
      post,
      loggedIn: req.session.loggedIn,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/dashboard')
  }
  res.render('login');
  });


router.get('/signup', (req, res) => {
    res.render('signup');
  });


module.exports = router;