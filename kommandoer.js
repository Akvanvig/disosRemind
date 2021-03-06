var funk = require('./funksjoner.js');
var Reminder = require('./Reminder.js');
var ps = require('python-shell');

// TODO: ADD ADMIN COMMANDO FOR GIVING ADMIN ROLE

var morse = {
            'A': '.-', 'B': '-...','C': '-.-.', 'D': '-..','E': '.','F': '..-.','G': '--.','H': '....',
            'I': '..', 'J': '.---','K': '-.-', 'L': '.-..','M': '--','N': '-.','O': '---','P': '.--.',
            'Q': '--.-', 'R': '.-.','S': '...', 'T': '-','U': '..-','V': '...-','W': '.--','X': '-..-',
            'Y': '-.--', 'Z': '--..','Æ': '.-.-', 'Ø': '---.','Å': '.--.-','1': '.----','2': '..---','3': '...--',
            '4': '....-', '5': '.....','6': '-....', '7': '--...','8': '---..','9': '----.','0': '-----','.': '.-.-.-',
            ',': '--..--', ':': '---...','?': '..--..', '-': '-....-','=': '-...-','/': '-..-.','(': '-.--.',')': '-.--.-',
            '+': '.-.-.', 'start': '-.-.-','stopp': '.-.-.', 'rettelse': '........','forstått': '...-.','avslutning': '...-.-','vent': '.-...','nødsignalet': '...---...',
            '!': '..--.', '@': '.--.-.'
        };

module.exports = {
    kommando: function (user, userID, channelID, message, serverID, bot, logger, reminders, roblxActive, startupTime, messageCode, evt) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd.toLowerCase()) {

            case 'ping':
                //var msgID = evt.d.id;
                //var timeSent = (msgID / 4194304) + 1420070400000;
                //var timePassed = + (new Date()).getTime() - timeSent;
                //bot.sendMessage({ to: channelID, message: 'Pong? ping: ' + timePassed + ' ms' });
                var code = Math.floor(Math.random() * 100000);
                messageCode[code] = (new Date()).getTime();
                bot.sendMessage({ to: channelID, message: 'Pong? ' + code });
                break;

            case 'pong':
                bot.sendMessage({ to: channelID, message: 'Ping?' });
                break;
                
            case 'remindme':
                var text = '';
                if (args.length > 1) {
                    for (var i = 1; i < args.length; i++) {
                        text += args[i] + ' ';
                    }
                }

                //Forhindrer misbruk av tagging p� discord
                text = text.replace('@', '#');

                if (funk.isInteger(args[0])) {
                    if (args[0] > 0 && args[0] % 1 == 0) {
                        bot.sendMessage({ to: channelID, message: 'Du vil f\u00e5 en p\u00e5minnelse om ' + args[0] + ' minutt(er)' });
                        argumenter = [args[0], userID, channelID, text, logger];
                        reminders.push(new Reminder(true, argumenter));
                        //Sorterer foh�pentligvis arrayen
                        reminders.sort(function compareNumbers(a, b) { return b.finishTime - a.finishTime; });
                        //Lagrer reminders til JSON
                        funk.saveReminders(reminders);
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
                argumenter = [10, userID, channelID, 'Grandis', logger];
                reminders.push(new Reminder(true, argumenter));
                funk.saveReminders(reminders);
                bot.sendMessage({ to: channelID, message: 'du vil bli varslet om 10 min' })
                break;

            case 'reminders':
                //var tekst = '\t User ID:                                          Remaining time:\n';
                //tekst += '```\n';
                var tekst = `\`\`\`\n${'User ID:'.padEnd(25, ' ')}${'Remaining Time:'.padEnd(45, ' ')}${'Message:'}\n`;
                var numNotPrinted = 0;
                for (var i = reminders.length-1; i >= 0 ; i--) {
                    if (reminders[i].channelID == channelID) {
                        var tempStr = `${reminders[i].userID}          ${(reminders[i].remainingTime).padEnd(45, ' ')} ${reminders[i].reqText} \n`
                        if (tekst.length + tempStr.length < 1950) {
                            tekst += tempStr;
                        } else {
                            numNotPrinted += 1;
                        }
                    }
                }
                tekst += '```';
                if (numNotPrinted != 0) {
                    tekst += `And ${numNotPrinted} more!`;
                }
                bot.sendMessage({ to: channelID, message: tekst })
                break;

            case 'allreminders':
                var tekst = `\`\`\`\t${'User ID:'.padEnd(25, ' ')}${'Remaining Time:'.padEnd(45, ' ')}${'Message:'}\n`;
                textList = [];
                for (var i = reminders.length-1; i >= 0 ; i--) {
                    if (reminders[i].channelID == channelID) {
                        var tempStr = `${(reminders[i].userID).padEnd(25, ' ')}${(reminders[i].remainingTime).padEnd(45, ' ')} ${reminders[i].reqText} \n`
                        if (tekst.length + tempStr.length < 1950) {
                            tekst += tempStr;
                        } else {
                            tekst += '```';
                            textList.push(tekst);
                            tekst = '```';
                            tekst += `\n${tempStr}`;
                        }
                    }
                }
                tekst += '\n```';
                textList.push(tekst);
                for (var i = 0; i < textList.length; i++) {
                    setTimeout(function(bot, channelID, message){
                        bot.sendMessage({ to: channelID, message: message });
                    }, (500*i), bot, channelID, textList[i]);
                }
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
                tekst += '\nOunze / oz';
                tekst += '\nMiles / mi';
                tekst += '\nFeet / ft';
                tekst += '\nInches / in';
                tekst += '\nMPH';
                tekst += '\nFahrenheit / \u00b0F';
                tekst += '\nKelvin / K';
                tekst += '\nBHP / HK';
                tekst += '\nFluid Ounze / fl oz';
                tekst += '\nPints / pt';
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

            case 'hemmeligkommando':
                bot.sendMessage({ to: userID, message: 'Hysj, dette her forteller du ikke om til noen' });
                bot.deleteMessage({channelID: channelID, messageID: evt.d.id});
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
                var respons = '';
                if (funk.isInteger(args[0]) && funk.isInteger(args[1]) && args[0] > 0 && args[0] < 100000 && args[1] > 0 && args[1] < 100000) {
                    var faktorer1 = funk.factorize(args[0]);
                    var faktorer2 = funk.factorize(args[1]);
                    var f = funk.removeCommon(faktorer1, faktorer2);
                    faktorer1 = f[0];
                    faktorer2 = f[1];
                    var res1 = funk.multiplyList(faktorer1);
                    var res2 = funk.multiplyList(faktorer2);
                    respons = args[0] + ' / ' + args[1] + ' = ' + res1 + ' / ' + res2;
                }
                else {
                    respons = 'Heltall større enn 0, "?Brøk [heltall 1] [heltall 2]"';
                }
                bot.sendMessage({ to: channelID, message: respons });
                break;

            case 'faktoriser':
                var respons = '';
                if (funk.isInteger(args[0]) && args[0] > 0 && args[0] < 100000) {
                    respons = args[0] + ' = ';
                    var faktorer = funk.factorize(args[0]);
                    respons += faktorer[0];
                    for (var i = 1; i < faktorer.length; i++) {
                     respons += ' \u00D7 ' + faktorer[i];
                    }
                }
                else if (funk.isInteger(args[0]) && args[0] > 0) {
                    respons = 'For stort tall, for å sjekke faktorene kan koden lastes ned her i enten python, javascript, java, visual basic eller som exe:\n\t\thttps://github.com/Akvanvig/Primtallsfaktorisering'
                }
                else {
                    respons = '"?Faktoriser [heltall større enn 0]"';
                }
                bot.sendMessage({ to: channelID, message: respons});
                break;

            case 'tilmorse':
                var res = args.join(' ').toUpperCase().split('');
                for (var i = 0; i < res.length; i++) {
                    if (res[i] == ' ') {
                        res[i] = '\t';
                    } else {
                        res[i] = morse[res[i]];
                    }
                }
                bot.sendMessage({ to: channelID, message: res.join(' ')});
                break;

            case 'framorse':
                //Oppretter en funksjon som lar dicts bli gjennomsøkt basert på verdi
                Object.prototype.getKeyByValue = function( value ) {
                    for( var prop in this ) {
                        if( this.hasOwnProperty( prop ) ) {
                            if( this[ prop ] === value ) {
                                return prop;
                            }
                        }
                    }
                }
                for (var i = 0; i < args.length; i++) {
                    if (args[i] == '' && args[i+1] == '' && args[i+2] == '' && args[i+3] == '' && args[i+4] == '') {
                        args[i] = ' ';
                    } else {
                        args[i] = morse.getKeyByValue(args[i]);
                    }
                }
                bot.sendMessage({ to: channelID, message: args.join('')});
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

            case 'leseveryone':
                try {
                    funk.lesEveryone(serverID, channelID, bot);
                } catch (e) {
                    bot.sendMessage({ to: 406104320745013259, message: 'Feil ?lesEveryone' + e });
                }
                break;

            case 'vær':
            case 'vaer':
            case 'var':
            case 'weather':
                var options = {args: args};
                try {
                    ps.PythonShell.run('./vaermelding.py', options, function (err, results) {
                        if (err) {
                            logger.info(err)
                            bot.sendMessage({to: channelID, message: 'Kunne ikke finne etterspurt sted \ud83e\udd14'})
                        }
                        else {
                                bot.sendMessage({to: channelID, message: results.length});
                                var str = '';
                                for (var i = 0; i < results.length; i++) {
                                    str += results[i] + '\n';
                                }
                                if (str.length > 996) {
                                    str = str.substring(0,996);
                                }
                                bot.sendMessage({to: channelID, message: str})
                        }
                    });
                } catch (e) {
                        logger.info(e)
                }
                break;
            case 'stjernetegn':
            case 'zodiac':
                //(user, userID, channelID, message, serverID, bot, logger, reminders, roblxActive, startupTime, evt)
                var seed = userID;
                var intSign = (Math.sin(seed) * 6) + 6;
                var sign = ["Vannmannen", "Fiskene", "Væren", "Tyren", "Tvillingene", "Krepsen", "Løven", "Jomfruen", "Vekten", "Skorpionen", "Skytten", "Steinbukken"];
                var resStr = "Ditt stjernetegn er \"" + sign[Math.floor(intSign)] + "\"";
                bot.sendMessage({to: channelID, message: resStr});
                break;
            case 'howdy':
                bot.sendMessage({to: channelID, message: '^howdy'});
                break;
            case 'howdysplurt':
                bot.sendMessage({to: channelID, message: '^howdySplurt'});
                break;
            case 'help':
            case 'hjelp':
                var tekst = '```Commands: ';
                tekst += '\n\nPing:';
                tekst += '\n\t\tSjekker tiden fra boten sender en melding til den mottar den fra Discord';
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
                tekst += '\n\t\tGjør om tekst til numeriske verdier. For unicode-verdier på alle tegn bruk: "?Numerisk Unicode [melding]"';
                tekst += '\n\nBrøk:';
                tekst += '\n\t\tGir deg en forkortet brøk: "?Brøk [heltall 1] [heltall 2]"';
                tekst += '\n\nFaktoriser';
                tekst += '\n\t\tReturnerer primtallsfaktorene til et gitt tall: "?Faktoriser [heltall større enn 0]"';
                tekst += '\n\ntilMorse';
                tekst += '\n\t\t?tilMorse [tekst og tall som skal oversettes]';
                tekst += '\n\nfraMorse';
                tekst += '\n\t\tSkill tegn med mellomrom, og ord med fem mellomrom (Ikke nødvendig å endre fra kommando ?tilMorse)';
                tekst += '\n\nlesEveryone';
                tekst += '```';
                bot.sendMessage({ to: channelID, message: tekst });
                break;
            default:
                var tekst = "For available commands, use \n\t ```?help```";
                bot.sendMessage({ to: channelID, message: tekst });
        }
        return [reminders, roblxActive, messageCode];
    }
}
