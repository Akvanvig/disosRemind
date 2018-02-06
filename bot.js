//Discord.io: https://izy521.gitbooks.io/discord-io/content/

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var funk = require('./funksjoner.js');
var lyder = require('./lyder.js');
var konvert = require('./konverteringer.js');
var reminders = [];
var checkReminders = setInterval(function() {reminder = funk.checkLastReminder(reminders, bot, logger); }, 1000); //Sjekker hvert sekund om noen påminnelser må gjennomføres
var checkActive = setInterval(function() {funk.checkActive(logger)}, 1800000); //Hver halvtime skrives det til logg om bot er aktiv
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
    var serverID = bot.channels[channelID].guild_id;
    //Diverse kommandoer
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd.toLowerCase()) {

            case 'ping':
                var timeSent = message.createdAt;
                var timePassed = Date() - timeSent;
                bot.sendMessage({ to: channelID, message: 'Pong? ping: ' + timePassed + ' ms' });
                break;

            case 'remindme':
                var text = '';
                if (args.length > 1) {
                    for (var i = 1; i < args.length; i++) {
                        text += args[i] + ' ';
                    }
                }

                //Forhindrer misbruk av tagging på discord
                text = text.replace('@', 'Alfakr\u00f8ll')

                if (funk.isInteger(args[0])) {
                    if (args[0] > 0 && args[0] % 1 == 0) {
                        bot.sendMessage({ to: channelID, message: 'Du vil f\u00e5 en p\u00e5minnelse om ' + args[0] + ' minutt(er)' });
                        reminders.push(new Reminder(args[0], userID, channelID, text));
                        //Sorterer fohåpentligvis arrayen
                        reminders.sort(function compareNumbers(a, b) { return b.finishTime - a.finishTime; });
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
                bot.sendMessage({ to: channelID, message: tekst })
                break;

            case 'tag':
                bot.sendMessage({ to: channelID, message: '<@!' + userID + '>' });
                break;

            //Legg inn overgang fra metrisk til US customary units
            case 'freedomunits':
                var tekst = 'Enheter lagt inn:';
                tekst += '\n\t\tkW (Til hk)';

                if (funk.isNumeric(args[0])) {
                    respons = '';
                    switch (args[1].toLowerCase()) {
                        case 'kw':
                            respons = convert(args[0], 0, 1.36, 'kW', 'hk');
                            break;

                        default:
                            respons = tekst;
                    }
                    bot.sendMessage({ to: channelID, message: respons });
                }
                else {
                    bot.sendMessage({ to: channelID, message: 'Brukes slik:\n\t\t?Freedomunits [antall metrisk enhet] [Enhet du vil gjøre om]\n\n' + tekst })
                }
                break;

            case 'konverteringer':
                var tekst = 'Pounds / lbs';
                tekst += '\nMiles / mi';
                tekst += '\nFeet';
                tekst += '\nMPH';
                tekst += '\nFahrenheit / °F';
                tekst += '\nKelvin / K';
                tekst += '\nBHP / HK'
                bot.sendMessage({ to: channelID, message: tekst });
                break;

            case 'oppetid':
                var uptime = new Date().getTime() - startupTime;
                var respons = bot.username + ' har kjørt i ';
                respons = funk.calcTime(uptime);
                bot.sendMessage({ to: channelID, message: respons });
                break;

            case 'kys': //xdd easteregg lol
                var tall = Math.random();
                var respons = '';
                if (tall > 0.1) {
                    respons = '\u2620 R.I.P ' + bot.username + ' \u2620';
                }
                else {
                    respons = funk.kys()
                }

                bot.sendMessage({ to: channelID, message: respons });
                break;

            default:
                var tekst = 'Commands: ';
                tekst += '\n\nPing:';
                tekst += '\n\t\tPong?';
                tekst += '\n\nRemindMe:';
                tekst += '\n\t\t?RemindMe [positiv integer antall minutt] [Eventuell tekst du \u00f8nsker \u00e5 motta]';
                tekst += '\n\nGrandis:';
                tekst += '\n\t\tGir deg varsel om ti minutt';
                tekst += '\n\nReminders:';
                tekst += '\n\t\tLar deg se alle p\u00e5minnelser';
                tekst += '\n\nKonverteringer:';
                tekst += '\n\t\tLar deg se implementerte konverteringer';
                tekst += '\n\nFreedomunits:';
                tekst += '\n\t\tOmgjør fra metrisk til imperial';
                tekst += '\n\nOppetid:';
                tekst += '\n\t\tSier hvor lenge boten har kjørt';
                tekst += '\n\nLyder:';
                tekst += '\n\t\tBruk "+" for å spille av lyder eller se hvilke som er tilgjengelige';
                bot.sendMessage({ to: channelID, message: tekst });
        }
    }
    //Hvis lyder skal spilles av
    else if (message.substring(0, 1) == '+') {
        lyder.lyder(user, userID, channelID, message, serverID, bot)
    }

    //Ser etter enheter å konvertere
    if (userID != bot.id) {
        var args = message.split(' ');
        //Går gjennom teksten på jakt etter tall
        for (var i = 0; i < (args.length - 1); i++) {
            //Blir et tall funnet, sjekker den ordet etter for enhetstype
            if (funk.isNumeric(args[i])) {
                konvert.konverter(channelID, bot, args, i)
            }
        }
    }
});

//Hvis bot-en disconnectes, vil den prøve å reconnecte
bot.on('disconnect', function (errMsg, code) {
    bot.connect();
});

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
        return funk.calcTime(result);
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
