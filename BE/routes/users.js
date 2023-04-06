const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticat = require('../middleware/authenticat');

const usersController = require('../controllers/users_controller');

// router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
// router.post('/update/:id', passport.checkAuthentication, usersController.update);

// router.get('/sign-up', usersController.signUp);

router.post('/create',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('phoneNo', 'Enter a valid ph no').isLength({ min: 10 }),
], usersController.create);

router.post('/sign-in',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').exists(),
], usersController.signIn);

router.get('/getuser/:id', authenticat, usersController.getuser);
router.delete('/destroy/:id', authenticat, usersController.destroy);
router.put('/update/:id', authenticat, usersController.update);

// use passport as a middleware to authenticate
// router.post('/create-session', passport.authenticate(
//     'local',
//     {failureRedirect: '/users/sign-in'},
// ), usersController.createSession);


//router.get('/sign-out', usersController.destroySession);

module.exports = router;