var funk = require('./funksjoner.js');

module.exports = {
    kommando: function (user, userID, channelID, message, serverID, bot, logger, reminders, roblxActive, startupTime) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd.toLowerCase()) {

            case 'ping':
                var timeSent = message.createdAt;
                var timePassed = + Date() - timeSent;
                bot.sendMessage({ to: channelID, message: 'Pong? ping: ' + timePassed + ' ms' });
                break;

            case 'remindme':
                var text = '';
                if (args.length > 1) {
                    for (var i = 1; i < args.length; i++) {
                        text += args[i] + ' ';
                    }
                }

                //Forhindrer misbruk av tagging p� discord
                text = text.replace('@', 'Alfakr\u00f8ll')

                if (funk.isInteger(args[0])) {
                    if (args[0] > 0 && args[0] % 1 == 0) {
                        bot.sendMessage({ to: channelID, message: 'Du vil f\u00e5 en p\u00e5minnelse om ' + args[0] + ' minutt(er)' });
                        reminders.push(new Reminder(args[0], userID, channelID, text, logger));
                        //Sorterer foh�pentligvis arrayen
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
                reminders.push(new Reminder(10, userID, channelID, 'Grandis', logger));
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
                    bot.sendMessage({ to: channelID, message: 'Brukes slik:\n\t\t?Freedomunits [antall metrisk enhet] [Enhet du vil gj�re om]\n\n' + tekst })
                }
                break;

            case 'konverteringer':
                var tekst = 'Pounds / lbs';
                tekst += '\nMiles / mi';
                tekst += '\nFeet';
                tekst += '\nMPH';
                tekst += '\nFahrenheit / �F';
                tekst += '\nKelvin / K';
                tekst += '\nBHP / HK'
                bot.sendMessage({ to: channelID, message: tekst });
                break;

            case 'oppetid':
                var uptime = new Date().getTime() - startupTime;
                var respons = bot.username + ' har kj�rt i ';
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

            case 'str2num':
            case 'numerisk':
                var tegn;
                var unicode = false;
                if (args[0].toLowerCase() == 'unicode') {
                    args = args.splice(1);
                    unicode = true;
                }
                var tekst = args.join(' ');
                if (unicode) {
                    tegn = tekst.split(''); //Fjerner første tegnene (unicode kodeordet) og legger i tegn
                    for (var i = 0; i < tegn.length; i++) {
                        tegn[i] = tegn[i].charCodeAt(0);
                    }
                    bot.sendMessage({ to: channelID, message: tegn.join(',') });
                }
                else {  //Standard a=1, b=2 osv. ' ' = 0
                    var tegn = tekst.toLowerCase().split('');
                    for (var i = 0; i < tegn.length; i++) {
                        if (tegn[i].charCodeAt(0) > 96 && tegn[i].charCodeAt(0) < 123 ) {
                            tegn[i] = (tegn[i].charCodeAt(0)) - 96;
                        }

                        else if (tegn[i].charCodeAt(0) == 229) { tegn[i] = 0; }     //' '
                        else if (tegn[i].charCodeAt(0) == 229) { tegn[i] = 29; }    //'å'
                        else if (tegn[i].charCodeAt(0) == 230) { tegn[i] = 27; }    //'æ'
                        else if (tegn[i].charCodeAt(0) == 248) { tegn[i] = 28; }    //'ø'
                    }
                    bot.sendMessage({ to: channelID, message: tegn.join(',') });
                }
                break;

            case 'brok':
            case 'brøk':
                if (funk.isInteger(args[0]) && funk.isInteger(args[1]) && args[0] > 0 && args[1] > 0) {
                    var faktorer1 = funk.factorize(args[0]);
                    var faktorer2 = funk.factorize(args[1]);
                    var f = funk.removeCommon(faktorer1, faktorer2);
                    faktorer1 = f[0];
                    faktorer2 = f[1];
                    var res1 = funk.multiplyList(faktorer1);
                    var res2 = funk.multiplyList(faktorer2);
                    bot.sendMessage({ to: channelID, message: args[0] + ' / ' + args[1] + ' = ' + res1 + ' / ' + res2 });
                }
                else {
                    bot.sendMessage({ to: channelID, message: 'Heltall større enn 0, "?Brøk [heltall 1] [heltall 2]"' });
                }
                break;

            case 'roblox':
                var granted = true;
                logger.info('Roblox mode started - ' + bot.servers[serverID].name);
                if (granted) {
                    var d = new Date;
                    bot.sendMessage({ to: channelID, message: 'Roblox-mode started' });
                    roblxActive.push([channelID, (d.getTime() + 300000)]);
                    //Sorterer foh�pentligvis arrayen
                    roblxActive.sort(function sortFunction(a, b) { return b[1] - a[1]; });
                }
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
                tekst += '\n\t\tOmgj\u00f8r fra metrisk til imperial';
                tekst += '\n\nOppetid:';
                tekst += '\n\t\tSier hvor lenge boten har kj\u00f8rt';
                tekst += '\n\nLyder:';
                tekst += '\n\t\tBruk "+" for \u00e5 spille av lyder eller se hvilke som er tilgjengelige';
                tekst += '\n\nNumerisk:';
                tekst += '\n\t\tGjør om tekst til numeriske verdier. For unicode-verdier på alle tegn bruk: "?Numerisk Unicode [melding]"'
                tekst += '\n\nBrøk:';
                tekst += '\n\t\tGir deg en forkortet brøk: "?Brøk [heltall 1] [heltall 2]"'
                bot.sendMessage({ to: channelID, message: tekst });
        }
        return [reminders, roblxActive];
    }
}

class Reminder {
    //Takes in time for alarm, userID that requested reminder, channelID it was requested in and text requested
    constructor(time, uid, chid, text, logger) {
        var d = new Date();
        this.time = ((time * 60 * 1000) + (d.getTime()));
        this.uid = uid;
        this.chid = chid;
        this.text = text;
        logger.info('P�minnelse opprettet');
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
