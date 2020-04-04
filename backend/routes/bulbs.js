var express = require('express');
var router = express.Router();
var cors = require('cors');
var app = express()

app.use(cors());

var Bulbs = require('../helpers/bulbs');

/* GET bulb page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express bulb work fine!' });
});

/* GET turn on/off light bulb. */
router.get('/state/:num', cors(), function (req, res, next) {
    const state = Number(req.params.num);
    const bulbs = new Bulbs.stateBulbs(state, function (response) {
        res.status(200).send(response)
    });
});

router.get('/info', cors(), function (req, res, next) {
    const bulbs = new Bulbs.info(function(response){
        res.send(response)
    })
});

module.exports = router;