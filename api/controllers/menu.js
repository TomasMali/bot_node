

'use strict';
const Telegram = require('telegram-node-bot')

const request = require('request')

const http = require('http')


const axios = require('axios');




class MenuController extends Telegram.TelegramBaseController {


// Testato e funziona
    getOneMenu($) {
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
        const menuId = parseInt($.message.text.split(' ').slice(1).join(' '),10)
        console.log(menuId)
        if (menuId !== parseInt(menuId, 10) || menuId === '') {
            var commando = [];
            commando.push('Commando non riconosciuto! ');
            commando.join('\n');
            commando.push('Scrivi:   "/dammiMenuNr" uno spazio, poi il numero del menu da visualizzare. Esempio:');
            commando.join('\n');
            commando.push('/dammiMenuNr 2')
            $.sendMessage(commando.join('\n'))
            return
        }
        axios.get('http://localhost:3000/menu/find_one/'+menuId)
        .then(response => {
            let obj = response.data;
            if (obj.message.length>0) {
                var result = [];
                const json_ = obj.message;

                json_.forEach(i => result.push(i));

                var resultAsString = [];

                json_.forEach((v, i) => {
                    resultAsString.push('****      MENU NUMERO '+(i + 1) + ')   ***')
                    resultAsString.push('\n')
                //    resultAsString.join('\n');

                    resultAsString.push("Menu_Id =====> [" + v.menuId + ']')

                    resultAsString.join('\n');

                    resultAsString.push("Primo =====> [" + v.primo.varieta_1
                        + "  , " + v.primo.varieta_2
                        + "  , " + v.primo.varieta_3
                        + "  , " + v.primo.varieta_4
                        + "  , " + v.primo.varieta_5 + ']')

                    resultAsString.join('\n');

                    resultAsString.push("Secondo =====> [" + v.secondo.varieta_1
                        + "  , " + v.secondo.varieta_2
                        + "  , " + v.secondo.varieta_3
                        + "  , " + v.secondo.varieta_4
                        + "  , " + v.secondo.varieta_5 + ']')

                    resultAsString.join('\n');

                    resultAsString.push("Contorno =====> [" + v.contorno.varieta_1
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
            else
            $.sendMessage("Menu non esistente. Scegli un'altro menu")
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
    getAllMenu($) {
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
        axios.get('http://localhost:3000/menu')
            .then(response => {
                let obj = response.data;
                if (obj.message) {
                    var result = [];
                    const json_ = obj.message;

                    json_.forEach(i => result.push(i));

                    var resultAsString = [];

                    json_.forEach((v, i) => {
                        resultAsString.push('<                    Menu numero '+(i + 1) + ')')
                        resultAsString.join('\n');

                        resultAsString.push("Menu_Id =====> [" + v.menuId + ']')

                        resultAsString.join('\n');

                        resultAsString.push("Primo =====> [" + v.primo.varieta_1
                            + "  , " + v.primo.varieta_2
                            + "  , " + v.primo.varieta_3
                            + "  , " + v.primo.varieta_4
                            + "  , " + v.primo.varieta_5 + ']')

                        resultAsString.join('\n');

                        resultAsString.push("Secondo =====> [" + v.secondo.varieta_1
                            + "  , " + v.secondo.varieta_2
                            + "  , " + v.secondo.varieta_3
                            + "  , " + v.secondo.varieta_4
                            + "  , " + v.secondo.varieta_5 + ']')

                        resultAsString.join('\n');

                        resultAsString.push("Contorno =====> [" + v.contorno.varieta_1
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
    removeOneMenu($) {
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
        axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
        .then(response => {
            let obj = response.data;
            // Controllo se l'utente è admin
            if (obj.message[0].admin === true) {
                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                const data = JSON.stringify({          
                    menuId: parseInt($.message.text.split(' ').slice(1).join(' '),10)
                })
                const option = {
                    hostname: 'localhost',
                    port: 3000,
                    path: '/menu/delete_one',
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                    }
                }
                const req = http.request(option, (res) => {
                  res.on('data', (d) => {
                    let obj = JSON.parse(d);
                    $.sendMessage(obj.message)
                  })
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



          // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        }
    })
  })
  req.on('error', (error) => {
    console.error(error)
  })
  req.end()



    }

    insertMenu($) {

    }




    get routes() {
        return {
            'getOneMenu': 'getOneMenu',
            'getAllMenu': 'getAllMenu',
            'removeOneMenu': 'removeOneMenu',
            'insertMenu': 'insertMenu'
        }
    }
}

module.exports = MenuController;