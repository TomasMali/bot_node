


'use strict';

const http = require('http')
const Telegram = require('telegram-node-bot');

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
            var result = []

            result.push("<            WHAT CAN I DO FOR YOU ")
        //    result.push('\n')
         //   result.push(" /JoinMe  Per registrarsi")  
            result.push('\n')
            result.push(" /RemoveMe  Per non ricevere più notifiche")   
            result.push('\n')
            result.push(" /getAllUser  Per visualizzare tutti gli utenti") 
            result.push('\n')
            result.push(" /CiVengoAnchioOggi  Per unirti a pranzo") 
            result.push('\n')
            result.push(" /NonCiVengoPiu  Ho cambiato idea")   
            result.push('\n')
            result.push(" /GuardaChiCeOggi Guarda chi si unisce oggi") 
      
            $.sendMessage(result.join('\n'));
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