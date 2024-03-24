const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to fetch all blogs for the homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User, attributes: ['name'] }],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch a specific blog by ID and its associated comments
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }],
        });
        if (!blogData) {
            return res.status(404).send('Blog not found');
        }
        const blog = blogData.get({ plain: true });
        const commentData = await Comment.findAll({
            where: { blog_id: blog.id },
            include: [{ model: User, attributes: ['name'] }],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('blog', {
            ...blog,
            comments,
            logged_in: req.session.logged_in,
            logged_in_userId: req.session.user_id
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render the dashboard page for authenticated users
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });
        if (!userData) {
            return res.status(404).send('User not found');
        }
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
});

module.exports = router;

