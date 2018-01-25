var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var reminders = [];

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
                var text = '';
                if (args.length > 1) {
                    for (var i = 1; i < args.length; i++) {
                        text += args[i];
                    }
                }

                //funksjoner.RemindMe(userID, args[0], channelID, text, bot)
                if (isInteger(args[0])) {
                    if (args[0] > 0 && args[0] % 1 == 0) {
                        bot.sendMessage({ to: channelID, message: 'Du vil få en påminnelse om ' + args[0] + ' minutter' });
                        reminders.push(new Reminder(args[0], userID, channelID, text));
                        reminders.sort(reminders.compare);
                        bot.sendMessage({to: channelID, message: reminders})
                        
                    }
                    else {
                        bot.sendMessage({ to: channelID, message: 'Bare positive heltall :)))'})
                    }
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

function isInteger(num) {
    return !isNaN(parseInt(num)) && isFinite(num);
}

//Mangler metode for å sortere så neste alarm havner nederst (kan da bruke pop på array for å fjerne siste element)
class Reminder {
    //Takes in time for alarm, userID that requested reminder, channelID it was requested in and text requested
    constructor(time, uid, chid, text) {
        this.time = time;
        this.uid = uid;
        this.chid = chid;
        this.text = text;
    }

    getTime() {
        return this.time;
    }

    sendReminder() {
        bot.sendMessage({ to: this.chid, message: '<@!' + this.uid + '> ' + this.text });
    }

    static compare(tidA, tidB) {
        return tidA.getTime() - tidB.getTime();
    }
};