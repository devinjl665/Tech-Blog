const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-route.js');
const dashboardRoutes = require('./dashboard-route.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;