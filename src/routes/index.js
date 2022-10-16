const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../controllers/jwt');

const Auth = require('./auth');
const Characters = require('./characters');
const Movies = require('./movies');

router.use('/auth', Auth);
router.use('/characters', verifyToken, Characters);
router.use('/movies', verifyToken, Movies);


module.exports = router