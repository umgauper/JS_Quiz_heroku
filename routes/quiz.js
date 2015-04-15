/**
 * Created by una on 3/26/15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('quiz');
});

module.exports = router;
