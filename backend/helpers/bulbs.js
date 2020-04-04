'use strict';

var TPLSmartDevice = require('tplink-lightbulb');

function stateBulbs(state, callback) {
    const light = new TPLSmartDevice('192.168.1.84')
    light.send({
        'smartlife.iot.smartbulb.lightingservice': {
            'transition_light_state': {
                'on_off': state,
                'transition_period': 0
            }
        }
    })
        .then(response => {
            return callback(response);
        })
        .catch(e => {
            console.error(e)
        })
}

function info(callback) {
    const light = new TPLSmartDevice('192.168.1.84')
    light.info()
        .then(info => {
            return callback(info)
        })
}

module.exports = {
    stateBulbs,
    info
}