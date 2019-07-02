


'use strict';

const http = require('http')
const axios = require('axios');

const Telegram = require('telegram-node-bot');

const MenuDelGiornoController = require('./menuDelGiorno')
const MenuController = require('./menu')
const UsersController = require('./users')

class OtherwiseController extends Telegram.TelegramBaseController {
  handle($) {



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
              var result = []
              if (obj.message[0].admin !== true) {
                // Visualizzabile aggli utenti normali


                $.runMenu({
                  message: '*** COSA POSSO FARE PER TE *** ',
                  layout: 2,
                  '\ud83c\udf5c  /menuDelGiorno': () => { new MenuDelGiornoController().getMenuDelGiorno($) },
                  '\ud83d\udd0d  /GuardaChiCiVaOggi': () => { new UsersController().GuardaChiCiVaOggi($) },
                  '\ud83d\udc65  /CiVengoAnchioOggi': () => { new UsersController().CiVengoAnchioOggi($) },
                  '\ud83d\udc4b  /NonCiVengoPiu': () => { new UsersController().NonCiVengoPiu($) },
                  '\u274e  /RemoveMe': () => { new UsersController().removeUser($) },
                })

                /*
                              result.push('*** WHAT CAN I DO FOR YOU ***')
                              result.push('\n')
                              result.push('-------------------------------------------------')
                              result.push(" /menuDelGiorno  Il menu di oggi.")
                              result.push('-------------------------------------------------')
                              result.push(" /GuardaChiCiVaOggi Guarda chi si unisce oggi")
                       //       result.push('-------------------------------------------------')
                      //        result.push(" /getAllUsers  Per visualizzare tutti gli utenti")
                              result.push('--------------------------------------------------')
                              result.push(" /CiVengoAnchioOggi  Per unirti a pranzo")
                              result.push('--------------------------------------------------')
                              result.push(" /NonCiVengoPiu  Ho cambiato idea")
                              result.push('-------------------------------------------------')
                              result.push(" /RemoveMe  Per non ricevere più notifiche")
                              result.push('--------------------------------------------------')
                                    result.push('\n')
              */





              }
              else {
        //        result.push('*** SOLO AMMINISTRATORI ***')
    //            result.push('\n')
        //        result.push('----------------------------------------------------')
             //   result.push(" /inserisciPiattoDelGiorno  Inserisci il menu del giorno.")
             //   result.push('---------------------------------------------------')
          //      result.push(" /dammiMenuNr Visualizza un menu in base al numero passato. Scrivi ad esemp: " + "'/dammiMenuNr 1' per vedere menu nr 1")
             //   result.push('----------------------------------------------------')
             //   result.push(" /dammiTuttiIMenu  Visualizza tutti i menu.")
            //    result.push('----------------------------------------------------')
           //     result.push(" /cancellaMenuNr Canella un menu in base al numero passato. Esempio: " + "'/cancellaMenuNr 1' per cancellare il nr 1")
             //   result.push('-----------------------------------------------------')
              //  result.push(" /inserisciMenu  Inserisci un nuovo menu.")
          //      result.push('-----------------------------------------------------')
         //       result.push('\n')
/*
                result.push("*** COMMANDI PER TUTTI ***")

                result.push('\n')
                result.push('-----------------------------------------------------')
                result.push(" /menuDelGiorno  Il menu di oggi.")
                result.push('-----------------------------------------------------')
                result.push(" /GuardaChiCiVaOggi Guarda chi si unisce oggi")


                result.push('------------------------------------------------------')
                result.push(" /getAllUsers  Per visualizzare tutti gli utenti")
                result.push('------------------------------------------------------')
                result.push(" /CiVengoAnchioOggi  Per unirti a pranzo")
                result.push('-------------------------------------------------------')
                result.push(" /NonCiVengoPiu  Ho cambiato idea")
                result.push('-------------------------------------------------------')
                result.push(" /RemoveMe  Per non ricevere più notifiche")
                result.push('------------------------------------------------------')
*/


                $.runMenu({
                  message: '*** SCEGLI UNO DEI COMANDI *** ',
                  layout: 2,
                  '/inserisciPiattoDelGiorno \ud83e\udd58 ': () => { new MenuDelGiornoController().inserisciMenuDiOggi($) },
                  '/inserisciMenu \ud83c\udf5b': () => { new MenuController().insertMenu($) },
                  '/trovaMenuConId \ud83c\udf72': () => { new MenuController().getOneMenu($) },
                  '/CancellaMenu \ud83c\udf65': () => { new MenuController().removeOneMenu($) },
                  '/MenuList \ud83c\udf54': () => { new MenuController().MenuList($) },
                  '/menuDelGiorno \ud83c\udf5c': () => { new MenuDelGiornoController().getMenuDelGiorno($) },
                  '/GuardaChiCiVaOggi \ud83d\udd0d': () => { new UsersController().GuardaChiCiVaOggi($) },
             //     '\ud83d\udc65  /CiVengoAnchioOggi': () => { new UsersController().CiVengoAnchioOggi($) },
             //     '\ud83d\udc4b  /NonCiVengoPiu': () => { new UsersController().NonCiVengoPiu($) },
                  '/UtentiRegistrati \ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66': () => { new UsersController().getAllUsers($) },
                  '/MandaMenuDelGiorno_A_Tutti \ud83d\udce2': () => { new MenuDelGiornoController().MandaMenuDelGiorno_A_Tutti($) }   
                })


              }
          //    $.sendMessage(result.join('\n'));

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



}

module.exports = OtherwiseController;