

'use strict';
const Telegram = require('telegram-node-bot')

const request = require('request')

const http = require('http')


const axios = require('axios');




class MenuController extends Telegram.TelegramBaseController {



  // Testato e funziona
  getOneMenu($) {

    $.sendMessage('Dammi Id del menu da cercare')
    $.waitForRequest
    .then($ => {



    // Qui cerco se l'utente è registrato
    const telegramUser = $.update.message.from;  //  https://rest-restorante.herokuapp.com
    const options = {
      hostname: 'localhost',
      port: process.env.PORT || 3000,
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
          const menuId = parseInt($.message.text,10);
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
          axios.get('http://localhost:3000/menu/find_one/' + menuId)
            .then(response => {
              let obj = response.data;
              if (obj.message.length > 0) {
                var result = [];
                const json_ = obj.message;

                json_.forEach(i => result.push(i));

                var resultAsString = [];

                json_.forEach((v, i) => {
                //  resultAsString.push('****      MENU NUMERO ' + (i + 1) + ')   ***')
                  resultAsString.push('\n')
                  //    resultAsString.join('\n');

                  resultAsString.push("\ud83d\udd18 Menu_Id =====> [" + v.menuId + ']')

                  resultAsString.join('\n');

                  resultAsString.push("\ud83d\udd18 Primo =====> [" + v.primo.varieta_1
                    + "  , " + v.primo.varieta_2
                    + "  , " + v.primo.varieta_3
                    + "  , " + v.primo.varieta_4
                    + "  , " + v.primo.varieta_5 + ']')

                  resultAsString.join('\n');

                  resultAsString.push("\ud83d\udd18 Secondo =====> [" + v.secondo.varieta_1
                    + "  , " + v.secondo.varieta_2
                    + "  , " + v.secondo.varieta_3
                    + "  , " + v.secondo.varieta_4
                    + "  , " + v.secondo.varieta_5 + ']')

                  resultAsString.join('\n');

                  resultAsString.push("\ud83d\udd18 Contorno =====> [" + v.contorno.varieta_1
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

  })



  }

  // Testato e funzionante
  MenuList($) {
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
                  resultAsString.push('<                     \ud83c\udf5b  ' + (i + 1) + ')')
                  resultAsString.join('\n');
                  resultAsString.push(" Menu_Id -----> [" + v.menuId + ']')

                  resultAsString.join('\n');

                  resultAsString.push("\ud83c\udf5c  Primo -----> [" + v.primo.varieta_1
                    + "  , " + v.primo.varieta_2
                    + "  , " + v.primo.varieta_3
                    + "  , " + v.primo.varieta_4
                    + "  , " + v.primo.varieta_5 + ']')

                  resultAsString.join('\n');

                  resultAsString.push("\ud83c\udf63 Secondo -----> [" + v.secondo.varieta_1
                    + "  , " + v.secondo.varieta_2
                    + "  , " + v.secondo.varieta_3
                    + "  , " + v.secondo.varieta_4
                    + "  , " + v.secondo.varieta_5 + ']')

                  resultAsString.join('\n');

                  resultAsString.push("\ud83e\udd57 Contorno -----> [" + v.contorno.varieta_1
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

    $.sendMessage('Dammi Id del menu da cancellare')
    $.waitForRequest
    .then($ => {
      
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
                  menuId: parseInt($.message.text,10)
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


  })
  }

  insertMenu($) {
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
                const form_1 = {
                  primi: {
                    q: 'Dammi il primo piatto, se ci sono più primi, separa con una virgola, se non cè neanche uno scrivi una virgola',
                    error: 'sorry, wrong input',
                    validator: (message, callback) => {
                      if (message.text) {
                        callback(true, message.text)
                        return
                      }
                      callback(false)
                    }
                  },
                  contorni: {
                    q: 'Dammi il contorno, se ci sono più contorni, separa con una virgola, se non cè neanche uno scrivi una virgola',
                    error: 'sorry, wrong input',
                    validator: (message, callback) => {
                      if (message.text) {
                        callback(true, message.text)
                        return
                      }
                      callback(false)
                    }
                  },
                  secondi: {
                    q: 'Dammi il secondo piatto, se ci sono più secondi, separa con una virgola, se non cè neanche uno scrivi una virgola',
                    error: 'sorry, wrong input',
                    validator: (message, callback) => {
                      if (message.text) {
                        callback(true, message.text)
                        return
                      }
                      callback(false)
                    }
                  }
                }

                // Insert menu 
                $.runForm(form_1, (result) => {
                  console.log(result)

                  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
                  axios.get('http://localhost:3000/menu/find_max')
                    .then(response => {
                      let obj = response.data;
                      if (obj.message) {
                        $.sendMessage(obj.message[0].menuId)

                        // Se primi ci sono più di una varietà
                        var primi_array = result.primi.split(',');
                        var contorni_array = result.contorni.split(',');
                        var secondi_array = result.secondi.split(',');

                        // ########################## INSERISCI MENU DEL GIORNO ##################################
                        request.post('http://localhost:3000/menu/insert', {
                          json: {
                            "menuId": (obj.message[0].menuId) + 1,
                            "primo": {
                              "varieta_1": primi_array[0] !== undefined ? primi_array[0] : "",
                              "varieta_2": primi_array[1] !== undefined ? primi_array[1] : "",
                              "varieta_3": primi_array[2] !== undefined ? primi_array[2] : "",
                              "varieta_4": primi_array[3] !== undefined ? primi_array[3] : "",
                              "varieta_5": primi_array[4] !== undefined ? primi_array[4] : "",
                            },
                            "secondo": {
                              "varieta_1": secondi_array[0] !== undefined ? secondi_array[0] : "",
                              "varieta_2": secondi_array[1] !== undefined ? secondi_array[1] : "",
                              "varieta_3": secondi_array[2] !== undefined ? secondi_array[2] : "",
                              "varieta_4": secondi_array[3] !== undefined ? secondi_array[3] : "",
                              "varieta_5": secondi_array[4] !== undefined ? secondi_array[4] : "",
                            },
                            "contorno": {
                              "varieta_1": contorni_array[0] !== undefined ? contorni_array[0] : "",
                              "varieta_2": contorni_array[1] !== undefined ? contorni_array[1] : "",
                              "varieta_3": contorni_array[2] !== undefined ? contorni_array[2] : "",
                              "varieta_4": contorni_array[3] !== undefined ? contorni_array[3] : "",
                              "varieta_5": contorni_array[4] !== undefined ? contorni_array[4] : "",
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
                      }
                      else
                        $.sendMessage("Menu non trovato ")
                    })
                    .catch(error => {
                      console.log(error);
                    });
                  // fine runForm
                })
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
    //

  }








  get routes() {
    return {
      'getOneMenu': 'getOneMenu',
      'MenuList': 'MenuList',
      'removeOneMenu': 'removeOneMenu',
      'insertMenu': 'insertMenu'
    }
  }
}

module.exports = MenuController;