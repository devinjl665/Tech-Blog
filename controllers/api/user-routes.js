const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
  try {
    
    const dbUserData = await User.create(
      req.body
    );
    
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res
      .status(200)
      .json(dbUserData)
    });
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    
    const validPassword = await dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res
      .status(200)
      .json(dbUserData)
    });
  
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {

  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;