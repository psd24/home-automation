var express = require('express');
var router = express.Router();

var Bulbs = require('../helpers/bulbs');

/* GET bulb page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express bulb work fine!' });
});

/* GET turn on/off light bulb. */
router.get('/state/:num', function (req, res, next) {
    const state = Number(req.params.num);
    const bulbs = new Bulbs(state, function (response) {
        res.send(response)
    });
});

module.exports = router;