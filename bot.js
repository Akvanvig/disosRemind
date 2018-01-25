var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
//configure loggersettings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true });
logger.level = 'debug';
//initialize Discord bot
var bot = new Discord.Client({ token: auth.token, autorun: true })
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ')
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with '?'
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            //?ping
            case 'ping':
                bot.sendMessage({ to: channelID, message: 'Pong?' });
                break;

            case 'RemindMe':
                //bot.sendMessage({to: channelID, message: 'Kan ikke love noe xdd'});
                //bot.sendMessage({to: channelID, message: remindMe(args[0], userID)});

                if (isNumeric(args[0])) {
                    bot.sendMessage({ to: channelID, message: 'Du vil få en påminnelse om ' + args[0] + ' minutter' });
                }
                else {
                    bot.sendMessage({ to: channelID, message: 'err0r not a number' });
                }
                break;

            case 'tag':
                bot.sendMessage({ to: channelID, message: '<@!' + userID + '>' });
                break;

            default:
                bot.sendMessage({ to: channelID, message: 'Commands: \n\n ping: \n\t\tpong? \n\n RemindMe: \n\t\tIkke implementert' });
        }
    }
});


function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}