var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    //req.db. ?? access the database, and sort by score? then send scores and users as array through res.render, render with jade template
    var cursor = req.db.collection('users').find().sort({'local.score': -1}).toArray(function(err, doc) {
        if (!err) {
            console.log(doc);
            res.render('rankings', {"doc": doc});
        }
    });


});

module.exports = router;