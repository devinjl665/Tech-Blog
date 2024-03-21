const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/update', withAuth, async (req, res) => {
    try {
        const updatedData = JSON.parse(JSON.stringify(req.body));

        const updateBlog = await Blog.update(
            { contents: updatedData.blogObject.contents, title: updatedData.blogObject.blogTitle},
            { 
                where: { id: updatedData.blogObject.blogId,
                },
            }
        )
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comments', withAuth, async (req, res) => {
    try {
        const data = JSON.parse(JSON.stringify(req.body));

        const newComment = await Comment.create({
            contents: data.bodyObject.contents,
            blog_id: data.bodyObject.blogId,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData){
            res.status(404).json({ message: 'Blog not found'});
            return;
        }
        
        res.status(200).json(blogData)

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;