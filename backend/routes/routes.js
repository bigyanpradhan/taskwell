const express = require('express');
const router = express.Router();
const {sample} = require('../controller/userController')
const {userSignUp, userSignIn} = require('../controller/userController')

router.get('/', sample)
router.post('/login', userSignIn)
router.post('/create-account', userSignUp)

module.exports = router;