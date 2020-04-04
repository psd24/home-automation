var express = require('express');
var router = express.Router();

var TPLSmartDevice = require('tplink-lightbulb');

/* GET bulb page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express bulb work fine!' });
});

/* GET turn on/off light bulb. */
router.get('/state/:num', function (req, res, next) {
    const num = Number(req.params.num);
    const light = new TPLSmartDevice('192.168.1.84')
    light.send({
        'smartlife.iot.smartbulb.lightingservice': {
            'transition_light_state': {
                'on_off': num,
                'transition_period': 0
            }
        }
    })
        .then(response => {
            res.send(response)
        })
        .catch(e => console.error(e))
});

module.exports = router;