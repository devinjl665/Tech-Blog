const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
  try {
      const blogUserData = await User.create(req.body);
      req.session.save(() => {
          req.session.user_id = blogUserData.id;
          req.session.username = blogUserData.username;
          req.session.loggedIn = true;
          res.status(201).json({ message: `Account created for ${blogUserData.username}`});
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.post('/login', async (req, res) => {
    try {
    
        const blogUserData = await User.findOne({
            where: { username: req.body.username },
        });
    
        if (!blogUserData) {
            res.status(400).json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }
    
        const validPassword = await blogUserData.checkPassword(req.body.password);    
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
    
        req.session.save(() => {
            req.session.user_id = blogUserData.id;
            req.session.username = blogUserData.username;
            req.session.loggedIn = true;

        res.status(200).json({ message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const blogUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;