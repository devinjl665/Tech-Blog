const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new blog post with the provided data
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // Respond with the newly created blog post
        res.status(200).json(newBlog);
    } catch (err) {
        // Handle any errors during blog creation and respond with a 400 status
        res.status(400).json(err);
    }
});

// Route to update an existing blog post
router.put('/update', withAuth, async (req, res) => {
    try {
        const updatedData = JSON.parse(JSON.stringify(req.body));

        console.log('##############    ' + updatedData.blogObject.contents + "    ID:     " + updatedData.blogObject.blogId);
        
        // Update the specified blog post with the updated data
        const updateBlog = await Blog.update(
            { contents: updatedData.blogObject.contents, title: updatedData.blogObject.blogTitle},
            {
                where: {
                    id: updatedData.blogObject.Id,
                },
            }
        );
        // Respond with a success message after updating the blog post
        res.status(200).json(updateBlog);
    } catch (err) {
        // Handle any errors during blog update and respond with a 400 status
        res.status(400).json(err);
    }
});

// Route to create a new comment on a blog post
router.post('/comments', withAuth, async (req, res) => {
    try {
        const data = JSON.parse(JSON.stringify(req.body));

        // Create a new comment with the provided data
        const newComment = await Comment.create({
            contents: data.bodyObject.contents,
            blog_id: data.bodyObject.blogId,
            user_id: req.session.user_id,
        });

         // Respond with the newly created comment
        res.status(200).json(newComment);
    } catch (err) {
        // Handle any errors during comment creation and respond with a 400 status
        res.status(400).json(err);
    }
});

// Route to delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the specified blog post if the logged-in user is the owner
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If no blog post is found, respond with a 404 status
        if (!blogData) {
            res.status(404).json({ message: 'No blog has been found with this id.'});
            return;
        }
        
        // Respond with a success message after deleting the blog post
        res.status(200).json(blogData);
    } catch (err) {
        // Handle any errors during blog deletion and respond with a 500 status
        res.status(500).json(err);
    }
});

module.exports = router;