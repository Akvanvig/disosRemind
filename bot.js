//Discord.io: https://izy521.gitbooks.io/discord-io/content/
//Test Python Script i kombinasjon med js/nJode
//https://stackoverflow.com/questions/23450534/how-to-call-python-function-from-nodejs

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var authYT = require('./auth-yt.json');
var funk = require('./funksjoner.js');
var kommando = require('./kommandoer.js');
var lyder = require('./lyder.js');
var konvert = require('./konverteringer.js');
var reminders = [];
var checkReminders = setInterval(function() {reminders = funk.checkLastReminder(reminders, bot, logger); }, 1000); //Sjekker hvert sekund om noen påminnelser må gjennomføres
var checkActive = setInterval(function() {funk.checkActive(logger)}, 1800000); //Hver halvtime skrives det til logg om bot er aktiv
var roblxActive = [];
var checkRoblx = setInterval(function() {funk.checkroblx(roblxActive)}, 2000);
var startupTime = new Date().getTime();


//configure loggersettings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true });
logger.level = 'debug';

//initialize Discord bot
var bot = new Discord.Client({ token: auth.token, autorun: true });

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ')
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    try {
        var serverID = bot.channels[channelID].guild_id;
    } catch (e) {
        if (userID != bot.id) {
          bot.sendMessage({to: channelID, message: '...'});
        }
    }
    //Diverse kommandoer
    if (message.substring(0, 1) == '?') {
        try {
            reminders = kommando.kommando(user, userID, channelID, message, serverID, bot, logger, reminders, roblxActive, startupTime);
        } catch (e) {
            bot.sendMessage({ to: channelID, message: e });
        }
    }
    //Hvis lyder skal spilles av
    else if (message.substring(0, 1) == '+') {
        try {
            lyder.lyder(user, userID, channelID, message, serverID, bot, logger);
        } catch (e) {
            bot.sendMessage({ to: channelID, message: 'error.exe launched - failed to execute order 66' });
        }

    }

    for (var i = 0; i < roblxActive.length; i++) {
        if (roblxActive[0][i] == channelID && userID != bot.id) {
            funk.roblxify(channelID, message, bot, evt);
        }
    }

    //Ser etter enheter å konvertere
    if (userID != bot.id) {
        var args = message.split(' ');
        //Går gjennom teksten på jakt etter tall
        for (var i = 0; i < (args.length - 1); i++) {
            //Blir et tall funnet, sjekker den ordet etter for enhetstype
            if (funk.isNumeric(args[i])) {
                konvert.konverter(channelID, bot, args, i);
            }
        }
        var nynorsk = '# Offentleg Samferdselsbodskap frå Språkrådet #'
        for (var i = 0; i < args.length; i++) {
            var argumenter = [].push(args[i].replace(/\n\t/g, " ").split(" ");
            switch (argumenter.toLowerCase().replace(/[-,._'^*"()[\]{}]/g, '')) {
                case 'korkje':
                    nynorsk += '\nkorkje = hverken';
                    break;
                case 'kjærleik':
                    nynorsk += '\nkjærleik = kjærlighet';
                    break;
                case 'hugleik':
                    nynorsk += '\nhugleik = fantasi';
                    break;
                case 'røyndom':
                    nynorsk += '\nrøyndom = virkelighet';
                    break;
                case 'olboge':
                    nynorsk += '\nolboge = albue';
                    break;
                case 'åtak':
                    nynorsk += '\nåtak = angrep';
                    break;
                case 'byrja':
                    nynorsk += '\nbyrja = begynne';
                    break;
                case 'hjå':
                    nynorsk += '\nhjå = hos';
                    break;
            }
        }
    if (nynorsk.length > 50) {
        bot.sendMessage({to: channelID, message: nynorsk});
    }
    }
});

//Hvis bot-en disconnectes, vil den prøve å reconnecte
bot.on('disconnect', function (errMsg, code) {
    bot.connect();
});
