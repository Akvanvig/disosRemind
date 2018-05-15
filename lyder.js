var funk = require('./funksjoner.js');
var Player = require('./Player.js');
var sid = './media/InitialD/';  //Sti Initial D
var sh = './media/heismusikk/'; //Sti Heismusikk
var stiID = [sid+'A-Perfect-Hero.mp3', sid+'Chemical-Love.mp3', sid+'Deja-Vu.mp3', sid+'Fly-Me-To-The-Moon-And-Back.mp3',
sid+'Forever-Young.mp3', sid+'Full-Metal-Cars.mp3', sid+'Gas-Gas-Gas.mp3', sid+'Running-in-The-90s.mp3', sid+'The-Top.mp3',
sid+'Dancing.mp3', sid+'Goodbye-Yellow-Brick-Road.mp3', sid+'Love-Is-In-Danger.mp3', sid+'Night-of-Fire.mp3', sid+'No-One-Sleep-In-Tokyo.mp3',
sid+'Space-Boy.mp3', sid+'Max-Power.mp3'];
var stiH = [sh+'Costa-Del-Sol.mp3', sh+'Mii-Channel-Theme.mp3'];

module.exports = {
    lyder: function (user, userID, channelID, message, serverID, bot, logger) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var vcID = bot.servers[serverID].members[userID].voice_channel_id;
        switch (cmd.toLowerCase()) {
            case 'leave':
                try {
                    bot.leaveVoiceChannel(vcID);
                } catch (e) {
                    logger.info('Leave utført med feilmelding');
                }

                break;

            case 'jodel':
                funk.playAudio(vcID, './media/jodel.mp3', bot);
                break;

            case 'kristian':
                funk.playAudio(vcID, './media/kristian.mp3', bot);
                break;

            case 't2':
                if (args[0] == 'full') {
                    funk.playAudio(vcID, './media/t2-long.mp3', bot);
                }
                else {
                    funk.playAudio(vcID, './media/t2-short.mp3', bot);
                }
                break;

            case 'prank':
                funk.playAudio(vcID, './media/prank.mp3', bot);
                break;

            case 'vibrator':
                funk.playAudio(vcID, './media/vibrator.mp3', bot);
                break;

            case 'redneck':
                funk.playAudio(vcID, './media/wedonotappreciateyourkindaroundhere.mp3', bot);
                break;

            case 'kjeften':
                funk.playAudio(vcID, './media/kjeften.mp3', bot);
                break;

            case 'ronaldo':
            case 'cr7':
                funk.playAudio(vcID, './media/ronaldo.mp3', bot);
                break;

            case 'anthem':
                funk.playAudio(vcID, './media/Boten-Anna.mp3', bot);
                break;
            /*case 'skottland':
                var tall = parseInt(Math.random() * 23);
                switch (tall) {
                    case 0:
                        funk.playAudio(vcID, './media/skott/tooHard.mp3', bot);
                        break;
                    case 1:
                        funk.playAudio(vcID, './media/skott/keepWankingMeOffImStaringToGetSoft.mp3', bot);
                        break;
                    case 2:
                        funk.playAudio(vcID, './media/skott/imStartingToGetSoft.mp3', bot);
                        break;
                    case 3:
                        funk.playAudio(vcID, './media/skott/navaTuuHard.mp3', bot);
                        break;
                    case 4:
                        funk.playAudio(vcID, './media/skott/keepWankingMe.mp3', bot);
                        break;
                    case 5:
                        funk.playAudio(vcID, './media/skott/sockMeOff.mp3', bot);
                        break;
                    case 6:
                        funk.playAudio(vcID, './media/skott/howDoesThatCockInUrMouthTaste.mp3', bot);
                        break;
                    case 7:
                        funk.playAudio(vcID, './media/skott/tasteEt.mp3', bot);
                        break;
                    case 8:
                        funk.playAudio(vcID, './media/skott/ohOohYee.mp3', bot);
                        break;
                    case 9:
                        funk.playAudio(vcID, './media/skott/oooohhh.mp3', bot);
                        break;
                    case 10:
                        funk.playAudio(vcID, './media/skott/suckMyBalls.mp3', bot);
                        break;
                    case 11:
                        funk.playAudio(vcID, './media/skott/takeEt.mp3', bot);
                        break;
                    case 12:
                        funk.playAudio(vcID, './media/skott/lickMyBalls.mp3', bot);
                        break;
                    case 13:
                        funk.playAudio(vcID, './media/skott/waaaatTakiDaDaDa.mp3', bot);
                        break;
                    case 14:
                        funk.playAudio(vcID, './media/skott/lickMyBallz.mp3', bot);
                        break;
                    case 15:
                        //funk.playAudio(vcID, './media/skott/you_got_a_big_ass_and_i_love_shaging_et.mp3', bot);
                        //break;
                    case 16:
                        funk.playAudio(vcID, './media/skott/iLoveShaginEt.mp3', bot);
                        break;
                    case 17:
                        //funk.playAudio(vcID, './media/skott/you_darty_fakin_slut.mp3', bot);
                        //break;
                    case 18:
                        funk.playAudio(vcID, './media/skott/suckMyCockQuick.mp3', bot);
                        break;
                    case 19:
                        funk.playAudio(vcID, './media/skott/grabEt.mp3', bot);
                        break;
                    case 20:
                        funk.playAudio(vcID, './media/skott/getMyCock.mp3', bot);
                        break;
                    case 21:
                        funk.playAudio(vcID, './media/skott/nooohShe.mp3', bot);
                        break;
                    case 22:
                        funk.playAudio(vcID, './media/skott/uaaaah.mp3', bot);
                        break;
                    default:
                        funk.playAudio(vcID, './media/t2-short.mp3', bot);
                }
                break;
                */
            //Spiller av tilfeldige sanger fra InitialD-lista
            case 'id':
            case 'initiald':
                //Funksjon ligger nederst i denne fila
                musikkListeAvspillingCmd(args, vcID, serverID, stiID, 'InitialD', channelID, bot, logger);
                break;

            //Spiller av tilfeldige sanger fra heismusikk-lista
            case 'm':
            case 'musikk':
                //Funksjon ligger nederst i denne fila
                musikkListeAvspillingCmd(args, vcID, serverID, stiH, 'musikk', channelID, bot, logger);

                break;
            default:
                var tekst = 'Leave:';
                tekst += '\n\t\tTvinger bot-en til \u00e5 forlate kanalen';
                tekst += '```';
                tekst += '\n\n Lyder lagt inn:';
                tekst += '\nJodel';
                tekst += '\nKristian';
                tekst += '\nT2:';
                tekst += '\n\t\t+T2';
                tekst += '\n\t\t+T2 full';
                tekst += '\nPrank';
                tekst += '\nVibrator';
                tekst += '\nRedneck';
                tekst += '\nKjeften';
                tekst += '\nRonaldo\t||\tcr7';
                tekst += '\nAnthem';
                //tekst += '\nSkottland';
                tekst += '\nMusikk\t||\tm';
                tekst += '\nInitialD\t||\tid';
                tekst += '\n\t\tSpiller av tilfeldige InitialD sanger, kan flyttes til annen samtale ved å gjenta kommandoen.\n\t\tFor full ID-sangliste, bruk: +InitialD liste eller +id l'
                tekst += '```';
                bot.sendMessage({ to: channelID, message: tekst });
        }
    }
}

function musikkListeAvspillingCmd(args, vcID, serverID, stiSanger, kommandoNavn, channelID, bot, logger) {
    if (args[0] == null) {
        funk.playRnd(vcID, serverID, stiSanger, 5, channelID, bot, logger);
    }
    else if (funk.isInteger(args[0])) {
        if (parseInt(args[0]) >= 0 && parseInt(args[0]) < stiSanger.length) {
            funk.playAudio(vcID, stiSanger[parseInt(args[0])], bot);
            var sti = stiSanger[parseInt(args[0])].split('/');
            bot.sendMessage({to:channelID, message: 'Spiller nå: ' + sti[3].replace('.mp3','').replace(/-/g,' ')});
        }
        else {
            bot.sendMessage({to:channelID, message: 'Velg et gyldig tall'});
        }
    }
    else if (args[0].toLowerCase() == 'l' || args[0].toLowerCase() == 'liste') {
        var sangerNavn = 'ID-sanger lagt inn:';
        for (var i = 0; i < stiSanger.length; i++) {
            var sti = stiSanger[i].split('/');
            var navn = sti[3].split('.');
            sangerNavn += '\n' + i + '.\t' + navn[0].replace(/-/g, ' ');
        }
        bot.sendMessage({to:channelID, message: sangerNavn});
    }
    else if (args[0].toLowerCase() == 'a' || args[0].toLowerCase() == 'ant' || args[0].toLowerCase() == 'antall') {
        if (funk.isInteger(args[1]) && args[1] > 0 && args[1] < 30) {
            funk.playRnd(vcID, serverID, stiSanger, args[1], channelID, bot, logger);
        }
        else {
            bot.sendMessage({to:channelID, message: 'Brukes slik: \n\t"+' + kommandoNavn + ' ant <antall>"'});
        }
    }
}
