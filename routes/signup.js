var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res) {
  res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect : '/quiz', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

module.exports = router;

