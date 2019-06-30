

'use strict';
const Telegram = require('telegram-node-bot')

const request = require('request')

const http = require('http')

const utils = require('../../utils.js')

const axios = require('axios');

class UsersController extends Telegram.TelegramBaseController {

  /**
   * this method insers a new user
   */
  addUser($) {
    //   const variabile =  $.message.text.split(' ').slice(1).join(' ');
    var telegramUser = $.update.message.from;

    request.post('http://localhost:3000/users/insert', {
      json: {
        "telegramId": telegramUser.id,
        "name": telegramUser.firstName,
        "surname": telegramUser.lastName,
        "admin": false,
        "launch": false
      }
    }, (error, res, body) => {
      if (error) {
        console.error(error)
        $.sendMessage("Something went wrong!")
        return
      }
      console.log(`statusCode: ${res.statusCode}` + body.message)
      $.sendMessage("Utente (" + telegramUser.firstName + " " + telegramUser.lastName + ")  " + body.message)
    })
  }




  /**
   * this method removes an user
   */
  removeUser($) {
    var telegramUser = $.update.message.from;
    axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
    .then(response => {
      let obj = response.data;
      console.log(obj.message)
      if (obj.message) {
  //###########################################################################
    const data = JSON.stringify({
      idT: $.update.message.from.id
    })
    const option = {
      hostname: 'localhost',
      port: 3000,
      path: '/users/delete_one',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    const req = http.request(option, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', (d) => {
        let obj = JSON.parse(d);
        $.sendMessage("User (" + telegramUser.firstName + " " + telegramUser.lastName + ")  " + obj.message)
      })
    })
    req.on('error', (error) => {
      console.error(error)
    })
    req.write(data)
    req.end()
//#########################################################################
        }
        else {
          $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
        }
      })
      .catch(error => {
        console.log(error);
      });
  }



  CiVengoAnchioOggi($) {
    var telegramUser = $.update.message.from.id;
    axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
      .then(response => {
        let obj = response.data;
        console.log(obj.message)
        if (obj.message) {
          //###########################################################################
          const data = JSON.stringify({
            launch: true
          })
          const option = {
            hostname: 'localhost',
            port: 3000,
            path: '/users/patch/' + telegramUser,
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            }
          }
          const req = http.request(option, (res) => {
            res.on('data', (d) => {
              let obj = JSON.parse(d);
              console.log(obj)
              if (obj.n)
                $.sendMessage("Ok sei stato aggiunto alla lista dei partecipanti")
              else
                $.sendMessage("Ops, qualcosa è andato storto!")
            })
          })
          req.on('error', (error) => {
            console.error(error)
          })
          req.write(data)
          req.end()
          //#########################################################################
        }
        else {
          $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  NonCiVengoPiu($) {
    var telegramUser = $.update.message.from.id;
    axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
      .then(response => {
        let obj = response.data;
        console.log(obj.message)
        if (obj.message) {
          //###########################################################################
          const data = JSON.stringify({
            launch: false
          })
          const option = {
            hostname: 'localhost',
            port: 3000,
            path: '/users/patch/' + telegramUser,
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            }
          }
          const req = http.request(option, (res) => {
            res.on('data', (d) => {
              let obj = JSON.parse(d);
              console.log(obj)
              if (obj.n)
                $.sendMessage("Ok sei stato rimosso dalla lista dei partecipanti!")
              else
                $.sendMessage("Ops, qualcosa è andato storto!")
            })
          })
          req.on('error', (error) => {
            console.error(error)
          })
          req.write(data)
          req.end()
          //#########################################################################
        }
        else {
          $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  GuardaChiCiVaOggi($){
    axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
    .then(response => {
      let obj = response.data;
      console.log(obj.message)
      if (obj.message) {
        // INTERNAL GET CALL ####################################################
        axios.get('http://localhost:3000/users/launch')
          .then(response => {
            let obj = response.data
            console.log('ciao  ' +obj)
            if (obj.message.length>0) {
              var result = [];
              const json_ = obj.message;

              json_.forEach(i => result.push(i));

              var resultAsString = [];

              json_.forEach((v, i) => {
                resultAsString.push((i + 1) + ")  Nome: " + v.name + "  Cognome: " + v.surname)
              })
              $.sendMessage(resultAsString.join('\n'))
              // Per mandare broadcast
              //  $.api.sendMessage(622406760, "Broadcast ")
            }
            else
            {
              $.sendMessage('Per il momento non ci va nessuno! Controlla più tardi.')
            }
          })
          .catch(error => {
            console.log(error);
          });
        // INTERNAL GET CALL ####################################################
      }
      else {
        $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
      }
    })
    .catch(error => {
      console.log(error);
    });
  }


//Non viene usato
  getUserIfExsists($) {

    const telegramUser = $.update.message.from; 

    axios.get('http://localhost:3000/users/find_one/' + telegramUser.id)
      .then(response => {
        let obj = response.data;
        if (obj.message) {
          $.sendMessage("Trovato [" + obj.message[0].name + " "
            + obj.message[0].surname + " " + obj.message[0].telegramId
            + " , Admin:  " + obj.message[0].admin + " , Pranzo: " + obj.message[0].launch + " ]")
          // Per mandare broadcast
          //  $.api.sendMessage(622406760, "Broadcast ")
        }
        else
          $.sendMessage("User non trovato ")
      })
      .catch(error => {
        console.log(error);
      });
  }



  getAllUsers($) {
    axios.get('http://localhost:3000/users/find_one/' + $.update.message.from.id)
      .then(response => {
        let obj = response.data;
        console.log(obj.message)
        if (obj.message) {
          // INTERNAL GET CALL ####################################################
          axios.get('http://localhost:3000/users')
            .then(response => {
              let obj = response.data;
              if (obj.message) {
                var result = [];
                const json_ = obj.message;

                json_.forEach(i => result.push(i));

                var resultAsString = [];

                json_.forEach((v, i) => {
                  resultAsString.push((i + 1) + ")  Nome: " + v.name + "  Cognome: " + v.surname)
                })
                $.sendMessage(resultAsString.join('\n'))
                // Per mandare broadcast
                //  $.api.sendMessage(622406760, "Broadcast ")
              }
            })
            .catch(error => {
              console.log(error);
            });
          // INTERNAL GET CALL ####################################################
        }
        else {
          $.sendMessage("Non sei ancora registrato, clickare /JoinMe per registrarsi ")
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  test($) {
    new utils().due($.update.message.from.id)
  }



  get routes() {
    return {
      'test': 'test',
      'addUser': 'addUser',
      'removeMe': 'removeUser',
      "getUserIfExsists": "getUserIfExsists",
      "getAllUsers": "getAllUsers",
      "CiVengoAnchioOggi": "CiVengoAnchioOggi",
      "NonCiVengoPiu": "NonCiVengoPiu",
      "GuardaChiCiVaOggi": "GuardaChiCiVaOggi"
    }
  }
}

module.exports = UsersController;