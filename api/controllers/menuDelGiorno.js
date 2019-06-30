

'use strict';
const Telegram = require('telegram-node-bot')

const request = require('request')

const http = require('http')


const axios = require('axios');

// const utils = require('../../utils')



class MenuDelGiornoController extends Telegram.TelegramBaseController {


    MandaMenuDelGiorno_A_Tutti($) {
        // Qui cerco se l'utente è registrato
        const telegramUser = $.update.message.from;  // http://localhost:3000/users/find_one/
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/users/find_one/' + telegramUser.id,
            method: 'GET'
        }
        const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d) => {
                let obj = JSON.parse(d);
                if (!obj.message)
                    $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
                else {
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
                    axios.get('http://localhost:3000/menuDelGiorno')
                        .then(response => {
                            let obj = response.data;
                            if (obj.message.length > 0) {
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


                                //        $.sendMessage(resultAsString.join('\n'))




                                axios.get('http://localhost:3000/users')
                                    .then(response => {
                                        let obj = response.data;
                                        if (obj.message) {
                                            var result = [];
                                            const json_ = obj.message;

                                            json_.forEach(i => result.push(i));

                                            //     var resultAsStringUsers = [];

                                            json_.forEach((v, i) => {
                                                // resultAsStringUsers.push((i + 1) + ")  Nome: " + v.name + "  Cognome: " + v.surname)
                                                $.api.sendMessage(v.telegramId, resultAsString.join('\n'))
                                            })
                                            //  $.sendMessage(resultAsString.join('\n'))
                                            // Per mandare broadcast
                                            //  $.api.sendMessage(622406760, "Broadcast ")
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });









                                // Per mandare broadcast
                                //  $.api.sendMessage(145645559, "Broadcast ")  145645559
                            }
                            else
                                $.sendMessage("Non è stato ancora inserito il menu del giorno! Inseriscilo prima poi riprova il commando per inviarlo a tutti.")
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                }
            })
        })
        req.on('error', (error) => {
            console.error(error)
        })
        req.end()
    }





    // Testato e funzionante
    getMenuDelGiorno($) {

        // Qui cerco se l'utente è registrato
        const telegramUser = $.update.message.from;  // http://localhost:3000/users/find_one/
        const options = { // localhost
            hostname: 'localhost',
           port: 3000,
            path: '/users/find_one/' + telegramUser.id,
            method: 'GET'
        }


        axios.get('http://localhost:3000/users/find_one/'+ telegramUser.id)
        .then(response => {
            let obj = response.data;
            if (!obj.message)
            $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
        else {
            // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
            const urlHeroku = 'http://localhost:3000/menuDelGiorno' // https://rest-restorante.herokuapp.com/menuDelGiorno
            // 'http://localhost:3000/menuDelGiorno'
            axios.get(urlHeroku)
                .then(response => {
                    let obj = response.data;
                    if (obj.message.length > 0) {
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
                        //  $.api.sendMessage(145645559, "Broadcast ")  145645559
                    }
                    else
                        $.sendMessage("Non è stato ancora inserito il menu del giorno. Riprova più tardi.")
                })
                .catch(error => {
                    console.log(error);
                });
            // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        }
        })
        .catch(error => {
            console.log(error);
        });


/*

        const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d) => {
                let obj = JSON.parse(d);
                if (!obj.message)
                    $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
                else {
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
                    const urlHeroku = 'https://rest-restorante.herokuapp.com/menuDelGiorno'
                    // 'http://localhost:3000/menuDelGiorno'
                    axios.get(urlHeroku)
                        .then(response => {
                            let obj = response.data;
                            if (obj.message.length > 0) {
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
                                //  $.api.sendMessage(145645559, "Broadcast ")  145645559
                            }
                            else
                                $.sendMessage("Non è stato ancora inserito il menu del giorno. Riprova più tardi.")
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                }
            })
        })
        req.on('error', (error) => {
            console.error(error)
        })
        req.end()

*/

    }

    // Testato e funzionante
    inserisciMenuDiOggi($) {
        // Qui cerco se l'utente è registrato
        const telegramUser = $.update.message.from;  // http://localhost:3000/users/find_one/
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/users/find_one/' + telegramUser.id,
            method: 'GET'
        }
        const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d) => {
                let obj = JSON.parse(d);
                if (!obj.message)
                    $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
                else { // Controllo se l'utente è ADMIN
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
                    axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
                        .then(response => {
                            let obj = response.data;
                            // Controllo se l'utente è admin
                            if (obj.message[0].admin === true) {
                                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                                const menuId = parseInt($.message.text.split(' ').slice(1).join(' '), 10)

                                if (menuId !== parseInt(menuId, 10) || menuId === '') {
                                    var commando = [];
                                    commando.push('Commando non riconosciuto! ');
                                    commando.join('\n');
                                    commando.push('Scrivi:   "/inserisciPiattoDelGiorno" uno spazio, poi Id menu da inserire. Esempio:');
                                    commando.join('\n');
                                    commando.push('/inserisciPiattoDelGiorno 2')
                                    $.sendMessage(commando.join('\n'))
                                    return
                                }

                                axios.get('http://localhost:3000/menu/find_one/' + menuId)
                                    .then(response => {
                                        let obj = response.data;
                                        // Entra solo se esiste il menu
                                        if (obj.message.length > 0) {

                                            // ############################### Cancello prima quello che c'è ########################## 

                                            const data = JSON.stringify({
                                            })
                                            const option = {
                                                hostname: 'localhost',
                                                port: 3000,
                                                path: '/menuDelGiorno/delete_all',
                                                method: 'DELETE',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Content-Length': data.length
                                                }
                                            }
                                            const req = http.request(option, (res) => {

                                            })
                                            req.on('error', (error) => {
                                                console.error(error)
                                            })
                                            req.write(data)
                                            req.end()
                                            // ########################## INSERISCI MENU DEL GIORNO ##################################
                                            request.post('http://localhost:3000/menuDelGiorno/insert', {
                                                json: {
                                                    "menuId": obj.message[0].menuId,
                                                    "primo": {
                                                        "varieta_1": obj.message[0].primo.varieta_1,
                                                        "varieta_2": obj.message[0].primo.varieta_2,
                                                        "varieta_3": obj.message[0].primo.varieta_3,
                                                        "varieta_4": obj.message[0].primo.varieta_4,
                                                        "varieta_5": obj.message[0].primo.varieta_5
                                                    },
                                                    "secondo": {
                                                        "varieta_1": obj.message[0].secondo.varieta_1,
                                                        "varieta_2": obj.message[0].secondo.varieta_1,
                                                        "varieta_3": obj.message[0].secondo.varieta_1,
                                                        "varieta_4": obj.message[0].secondo.varieta_1,
                                                        "varieta_5": obj.message[0].secondo.varieta_1
                                                    },
                                                    "contorno": {
                                                        "varieta_1": obj.message[0].contorno.varieta_1,
                                                        "varieta_2": obj.message[0].contorno.varieta_1,
                                                        "varieta_3": obj.message[0].contorno.varieta_1,
                                                        "varieta_4": obj.message[0].contorno.varieta_1,
                                                        "varieta_5": obj.message[0].contorno.varieta_1
                                                    }
                                                }
                                            }, (error, res, body) => {
                                                if (error) {
                                                    console.error(error)
                                                    $.sendMessage("Something went wrong!")
                                                    return
                                                }
                                                else
                                                    $.sendMessage(body.message)
                                            })
                                            // ##########################################################################################
                                        }
                                        else {
                                            $.sendMessage("Menu del giorno non esistente, prova con un'altro menu clickando /dammiTuttiIMenu")
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
                            }
                            else
                                $.sendMessage("Non hai privilegi per effettuare questa operazione!")
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                }
            })
        })
        req.on('error', (error) => {
            console.error(error)
        })
        req.end()

    }

    cancellaMenuDelGiorno($) {
        axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
            .then(response => {
                let obj = response.data;
                // Controllo se l'utente è admin
                if (obj.message[0].admin === true) {
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    const data = JSON.stringify({
                    })
                    const option = {
                        hostname: 'localhost',
                        port: 3000,
                        path: '/menuDelGiorno/delete_all',
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': data.length
                        }
                    }
                    const req = http.request(option, (res) => {
                        // Non controllo lo stato della richiesta DELETE perche non mi interessa. Cancello sempre tutto. 
                        $.sendMessage("Il menu del giorno cancellato correttamente! ")
                    })
                    req.on('error', (error) => {
                        console.error(error)
                    })
                    req.write(data)
                    req.end()
                    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
                }
                else
                    $.sendMessage("Non hai privilegi per effettuare questa operazione!")
            })
            .catch(error => {
                console.log(error);
            });
    }


    //   startcrono($){
    //       new utils().startCron($);

    //  }



    get routes() {
        return {
            'getMenuDelGiorno': 'getMenuDelGiorno',
            'inserisciMenuDiOggi': 'inserisciMenuDiOggi',
            'cancellaMenuDelGiorno': 'cancellaMenuDelGiorno',
            'MandaMenuDelGiorno_A_Tutti': 'MandaMenuDelGiorno_A_Tutti',
            'startcrono': 'startcrono'

        }
    }
}

module.exports = MenuDelGiornoController;