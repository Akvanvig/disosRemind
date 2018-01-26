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
                //bot.sendMessage({to: channelID, message: 'Kan ikke love noe xdd'});
                //bot.sendMessage({to: channelID, message: remindMe(args[0], userID)});
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
                        //Sorterer foh�pentligvis arrayen
                        reminders.sort(function compareNumbers(a, b) { return b.finishTime - a.finishTime;});
                        //Skriver ut alle unix-epoch timestamps gitt til n�
                        /*
                        var tekst = ''
                        setTimeout(function () {
                            for (var j = 0; j < reminders.length; j++) {
                                tekst += ' ' + reminders[j].finishTime.toString(2) + '\n ';
                            }
                            bot.sendMessage({ to: channelID, message: tekst });
                        }, 500);
                        */
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
                reminders.push(new Reminder(args[0], userID, channelID, 'Grandis'));
                bot.sendMessage({to: channelID, message: 'du vil varslet om 10 min'})

            case 'tag':
                bot.sendMessage({ to: channelID, message: '<@!' + userID + '>' });
                break;

            default:
                bot.sendMessage({ to: channelID, message: 'Commands: \n\n ping: \n\t\tpong? \n\n RemindMe: \n\t\t?RemindMe [positiv integer antall minutt] [Eventuell tekst du \u00f8nsker \u00e5 motta]\n\n?grandis\n\t\tGir deg varsel om ti minutt' });
        }
    }
});

function isInteger(num) {
    return !isNaN(parseInt(num)) && isFinite(num);
}

//Mangler metode for � sortere s� neste alarm havner nederst (kan da bruke pop p� array for � fjerne siste element)
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
        reminders.pop();
        logger.info('Påminnelse sendt');
    }
}
