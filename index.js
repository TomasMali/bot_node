'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('676793933:AAFSqroVLFsRsYU1nk12-gmVWrYprDN2q-I')
const UsersController = require('./api/controllers/users')
const OtherwiseController = require('./api/controllers/otherwise')
const MenuController = require('./api/controllers/menu')   
const MenuDelGiornoController = require('./api/controllers/menuDelGiorno') 



tg.router
    .when(
        new TextCommand('ping', 'do'),
        new UsersController()
    ).
    when(
        new TextCommand('/JoinMe', 'addUser'),
        new UsersController()
    ).
    when(
        new TextCommand('/RemoveMe', 'removeMe'),
        new UsersController()
    ).
    when(   
        new TextCommand('/getUserIfExsists', 'getUserIfExsists'),
        new UsersController()
    ).
    when(
        new TextCommand('/getAllUser', 'getAllUser'),
        new UsersController()
    ).
    when(
        new TextCommand('/CiVengoAnchioOggi', 'CiVengoAnchioOggi'),
        new UsersController()
    ).
    when(
        new TextCommand('/NonCiVengoPiu', 'NonCiVengoPiu'),
        new UsersController()
    ).
    when(
        new TextCommand('/GuardaChiCeOggi', 'GuardaChiCeOggi'),
        new UsersController()
    ).
    when(
        new TextCommand('/test', 'test'),
        new UsersController()
    ).
    //    MENU CONTROLLER
    when(
        new TextCommand('/dammiMenuNr', 'getOneMenu'),
        new MenuController()
    ).
    when(
        new TextCommand('/dammiTuttiIMenu', 'getAllMenu'),
        new MenuController()
    ).
    when(
        new TextCommand('/cancellaMenuNr', 'removeOneMenu'),
        new MenuController()
    ).
    when(
        new TextCommand('/inserisciMenu', 'insertMenu'),
        new MenuController()
    ).
    //    MENU DEL GIORNO CONTROLLER
    when(
        new TextCommand('/menuDiOggi', 'getMenuDelGiorno'),
        new MenuDelGiornoController()
    ).
     //    OTHERWISE CONTROLLER
    otherwise(
        new OtherwiseController()
    )