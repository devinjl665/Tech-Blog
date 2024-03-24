const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to fetch all blogs for the homepage
router.get('/', async (req, res) => {

    try {
        // Fetch all blogs with the associated username of the author
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Convert fetched data to plain objects
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Render the 'homepage' view with the retrieved data
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in // Pass the logged-in status to the view
        });
    } catch (err){
        res.json(500).json(err); // Handle any errors with a JSON response
    }
});

// Route to fetch a specific blog by ID and its associated comments
router.get('/blog/:id', async (req, res) => {
    try {
        // Fetch the blog by its ID with the associated username of the author
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Convert fetched blog data to a plain object
        const blog = blogData.get({ plain: true });

        // Fetch all comments related to the blog
        const commentData = await Comment.findAll({
            where: {
                blog_id: blog.id
            },
            include: [{
                model: User,
                attributes: ['name'],
            }],
        });

        // Convert fetched comment data to plain objects
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // Render the 'blog' view with the retrieved data
        res.render('blog', {
            ...blog,
            comments,
            logged_in: req.session.logged_in, // Pass logged-in status to the view
            logged_in_userId: req.session.user_id // Pass the logged-in user's ID to the view
        });
    } catch (err) {
        res.status(500).json(err); // Handle any errors with a JSON response

    }
});

// Route to render the dashboard page for authenticated users
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Fetch the user's data (excluding password) along with their associated blogs
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        // Convert fetched user data to a plain object
        const user = userData.get({ plain: true });

        // Render the 'dashboard' view with the retrieved user data
        res.render('dashboard', {
            ...user,
            logged_in: true // Indicate that the user is logged in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        // If user is already logged in, redirect to the dashboard
        res.redirect('/dashboard');
        return;
    }

    // Render the 'login' view
    res.render('login');
});

module.exports = router;

