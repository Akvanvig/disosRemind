var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var reminders = [];
var checkReminders = setInterval(checkLastReminder,1000);
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
                var text = '';
                if (args.length > 1) {
                    for (var i = 1; i < args.length; i++) {
                        text += args[i] + ' ';
                    }
                }

                if (isInteger(args[0])) {
                    if (args[0] > 0 && args[0] % 1 == 0) {
                        bot.sendMessage({ to: channelID, message: 'Du vil f\u00e5 en p\u00e5minnelse om ' + args[0] + ' minutt(er)' });
                        reminders.push(new Reminder(args[0], userID, channelID, text));
                        //Sorterer fohåpentligvis arrayen
                        reminders.sort(function compareNumbers(a, b) { return b.finishTime - a.finishTime;});
                    }
                    //Hvis tallet er mindre enn 0, eller ikke delbart med 1
                    else {
                        bot.sendMessage({ to: channelID, message: 'Bare positive heltall :)))' });
                    }
                }
                //Hvis det ikke blir skrevet et tall etter ?RemindMe
                else {
                    bot.sendMessage({ to: channelID, message: 'Brukes slik:\n\t\t?RemindMe [positiv integer antall minutt] [Eventuell tekst du \u00f8nsker \u00e5 motta]' });
                }
                break;

            case 'grandis':
                reminders.push(new Reminder(10, userID, channelID, 'Grandis'));
                bot.sendMessage({ to: channelID, message: 'du vil bli varslet om 10 min' })
                break;

            case 'reminders':
                var tekst = '\t User ID: \t\t\t\t\t\t\t\t Remaining time:\n'
                for (var i = 0; i < reminders.length; i++) {
                    tekst += ' ' + reminders[i].userID + ' \t ' + reminders[i].remainingTime + ' \t ' + reminders[i].reqText + '\n';
                }
                bot.sendMessage({ to:channelID, message: tekst})
                break;

            case 'tag':
                bot.sendMessage({ to: channelID, message: '<@!' + userID + '>' });
                break;

            default:
                bot.sendMessage({ to: channelID, message: 'Commands: \n\n ping: \n\t\tpong? \n\n RemindMe: \n\t\t?RemindMe [positiv integer antall minutt] [Eventuell tekst du \u00f8nsker \u00e5 motta]\n\ngrandis\n\t\tGir deg varsel om ti minutt \n\n reminders\n\t\tLar deg se alle p\u00e5minnelser' });
        }
    }
});

function isInteger(num) {
    return !isNaN(parseInt(num)) && isFinite(num);
}


class Reminder {
    //Takes in time for alarm, userID that requested reminder, channelID it was requested in and text requested
    constructor(time, uid, chid, text) {
        var d = new Date();
        this.time = ((time * 60 * 1000) + (d.getTime()));
        this.uid = uid;
        this.chid = chid;
        this.text = text;
        logger.info('Påminnelse opprettet');
    }

    get finishTime() {
        return this.time;
    }

    get remainingTime() {
        var result = this.time - new Date().getTime();
        result = result / 1000 / 60 / 60;

        var hr  = Math.floor(result);
        var min = (result % 1) * 60;
        var sek = Math.floor((min % 1) * 60);
        min = Math.floor(min);

        return hr + ' hour(s), ' + min + ' minute(s), ' + sek + ' second(s)';
    }

    get channelID() {
      return this.chid;
    }

    get userID() {
        return this.uid;
    }

    get reqText() {
      return this.text;
    }
};

//Sjekkes hvert sekund pga. timer satt opp øverst
function checkLastReminder() {
    var lengde = reminders.length;
    if (lengde > 0 && reminders[lengde - 1].finishTime <= new Date().getTime()) {
        bot.sendMessage({to: reminders[lengde - 1].channelID , message: '<@!' + reminders[lengde - 1].userID + '> ' + reminders[lengde - 1].reqText});
        //fjerner reminder
        reminders.pop();
        logger.info('Påminnelse sendt');
    }
}
