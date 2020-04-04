var express = require('express');
var router = express.Router();

/* GET bulb page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express bulb work fine!' });
});

/* GET libnmap page. */
router.get('/scan', function (req, res, next) {

});

module.exports = router;