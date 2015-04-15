var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { message: req.flash('loginMessage')});

});

// process the login form
router.post('/', passport.authenticate('local-login', {
  successRedirect : '/quiz', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

module.exports = router;
