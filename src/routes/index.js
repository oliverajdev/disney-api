const { Router } = require('express');
const router = Router();

const Auth = require('./auth');
const Characters = require('./characters');
const Movies = require('./movies');

router.use('/auth', Auth);
router.use('/characters', Characters);
router.use('/movies', Movies);


module.exports = router