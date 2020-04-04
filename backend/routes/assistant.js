var express = require('express');
var router = express.Router();

const path = require('path');
const GoogleAssistant = require('google-assistant');

var Bulbs = require('../helpers/bulbs');

router.get('/ask', function (req, res, next) {
    const ask = req.query.ask;
    if (ask == 'adios') next('route');
    else next();
}, function (req, res, next) {
    const query = req.query.ask;
    const config = {
        auth: {
            keyFilePath: path.resolve(__dirname, '../google-home-credentials/auth.json'),
            savedTokensPath: path.resolve(__dirname, '../google-home-credentials/tokens.json'),
        },
        // this param is optional, but all options will be shown
        conversation: {
            lang: 'es-ES', // defaults to en-US, but try other ones, it's fun!
            showDebugInfo: false, // default is false, bug good for testing AoG things
        },
    };

    const startConversation = (conversation) => {
        // setup the conversation
        conversation
            .on('response', text => {
                res.send(text)
                //console.log('Assistant Response:', text)
            })
            .on('debug-info', info => console.log('Debug Info:', info))
            // if we've requested a volume level change, get the percentage of the new level
            .on('volume-percent', percent => console.log('New Volume Percent:', percent))
            // the device needs to complete an action
            .on('device-action', action => console.log('Device Action:', action))
            // once the conversation is ended, see if we need to follow up
            .on('ended', (error, continueConversation) => {
                if (error) {
                    console.log('Conversation Ended Error:', error);
                } else if (continueConversation) {
                    promptForInput();
                } else {
                    console.log('Conversation Complete');
                    conversation.end();
                }
            })
            // catch any errors
            .on('error', (error) => {
                console.log('Conversation Error:', error);
            });
    };

    const promptForInput = () => {
        // Iniciar la conversacion con la pregunta que le emos pasado desde la url
        config.conversation.textQuery = query;
        assistant.start(config.conversation, startConversation);
    };

    const assistant = new GoogleAssistant(config.auth);
    assistant
        .on('ready', promptForInput)
        .on('error', (error) => {
            console.log('Assistant Error:', error);
        });
});

router.get('/ask', function (req, res, next) {
    const state = Number(req.query.state);
    const bulbs = new Bulbs(state, function (response) {
        res.send(response)
    });
});

module.exports = router;