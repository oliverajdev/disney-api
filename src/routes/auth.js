const {Router} = require('express')
const router = Router();
const { registerUser, LoginUser } = require('../controllers/auth')

router.post('/register',registerUser);

router.post('/login',LoginUser);




module.exports = router