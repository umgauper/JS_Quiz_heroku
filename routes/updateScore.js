var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    var user = req.user.local.username; //the logged in user
    var score = req.body.score;
    var query = {"local.username": user};
    var update = {$set: {"local.score": score}}; // just testing to see if update works ...
    var option = {upsert: true};

    req.db.collection('users').update(query, update, option, function(err) {
            if(!err) {
                console.log("update successful!");
            }
        }
    );
});

module.exports = router;