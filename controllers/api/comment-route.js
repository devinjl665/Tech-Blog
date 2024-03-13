const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try{ 
    const blogCommentData = await Comment.findAll({});
    if (blogCommentData.length === 0) {
      res.status(404).json({ message: "You have no comments."});
      return;
    };
    res.status(200).json(blogCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all the comments from a post
router.get('/:id', async (req, res) => {
  try {
      const commentData = await Comment.findAll({
          where: { id: req.params.id },
      });
      if (commentData.length === 0) {
          res.status(404).json({ message: `The id ${req.params.id} has no comment.` });
          return;
      }
      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// create comment
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json({ newComment, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogCommentData = await Comment.destroy({
        where: {id: req.params.id},
      });        
      if (!blogCommentData) {
        res.status(404).json({
          message: `No comment is found with id = ${req.params.id}`,
        });
        return;
      }  
      res.status(200).json({blogCommentData, success: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;