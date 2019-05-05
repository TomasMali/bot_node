

'use strict';
const Telegram = require('telegram-node-bot')

const request = require('request')

const http = require('http')


const axios = require('axios');




class MenuDelGiornoController extends Telegram.TelegramBaseController {



   

    getMenuDelGiorno($) {
        axios.get('http://localhost:3000/menuDelGiorno')
            .then(response => {
                let obj = response.data;
                if (obj.message) {
                    var result = [];
                    const json_ = obj.message;

                    json_.forEach(i => result.push(i));

                    var resultAsString = [];

                    json_.forEach((v, i) => {
                
                        resultAsString.push(" PRIMO  --------> [" + v.primo.varieta_1
                            + "  , " + v.primo.varieta_2
                            + "  , " + v.primo.varieta_3
                            + "  , " + v.primo.varieta_4
                            + "  , " + v.primo.varieta_5 + ']')

                        resultAsString.join('\n');

                        resultAsString.push("SECONDO  --------> [" + v.secondo.varieta_1
                            + "  , " + v.secondo.varieta_2
                            + "  , " + v.secondo.varieta_3
                            + "  , " + v.secondo.varieta_4
                            + "  , " + v.secondo.varieta_5 + ']')

                        resultAsString.join('\n');

                        resultAsString.push("CONTORNO  --------> [" + v.contorno.varieta_1
                            + "  , " + v.contorno.varieta_2
                            + "  , " + v.contorno.varieta_3
                            + "  , " + v.contorno.varieta_4
                            + "  , " + v.contorno.varieta_5 + "]"
                        )

                    })
                    $.sendMessage(resultAsString.join('\n'))
                    // Per mandare broadcast
                    //  $.api.sendMessage(622406760, "Broadcast ")
                }
            })
            .catch(error => {
                console.log(error);
            });
    }




    get routes() {
        return {
            'getMenuDelGiorno': 'getMenuDelGiorno'
        }
    }
}

module.exports = MenuDelGiornoController;