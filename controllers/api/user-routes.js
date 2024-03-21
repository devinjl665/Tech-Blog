const router = require('express').Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided data in the request body
    const userData = await User.create(req.body);

    // Save the user's session data and respond with the created user's data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle any errors during user creation and respond with a 400 status
    res.status(400).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find a user by their email address in the request body
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user found, respond with an error message
    if (!userData) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Check if the provided password matches the user's hashed password
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is invalid, respond with an error message
    if (!validPassword) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Save the user's session data and respond with the user's data and a success message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Login successful' });
    });
  } catch (err) {
    // Handle any errors during login and respond with a 400 status
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the user's session and respond with a 204 status (No Content)
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If no session is found, respond with a 404 status (Not Found)
    res.status(404).end();
  }
});

module.exports = router;
