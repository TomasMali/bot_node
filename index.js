'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('676793933:AAFSqroVLFsRsYU1nk12-gmVWrYprDN2q-I')
const UsersController = require('./api/controllers/users')
const OtherwiseController = require('./api/controllers/otherwise')



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
    otherwise(
        new OtherwiseController()
    )