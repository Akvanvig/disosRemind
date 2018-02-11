var funk = require('./funksjoner.js');

module.exports = {
    lyder: function (user, userID, channelID, message, serverID, bot) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var vcID = bot.servers[serverID].members[userID].voice_channel_id;
        switch (cmd.toLowerCase()) {
            case 'leave':
                bot.leaveVoiceChannel(vcID);
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

            case 'skottland':
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
            default:
                var tekst = 'Leave:';
                tekst += '\n\t\tTvinger bot-en til \u00e5 forlate kanalen';
                tekst = '\n\n Lyder lagt inn:';
                tekst += '\nJodel';
                tekst += '\nKristian';
                tekst += '\nT2:';
                tekst += '\n\t\t+T2';
                tekst +='\n\t\t+T2 full';
                tekst += '\nPrank';
                tekst += '\nVibrator';
                tekst += '\nRedneck';
                tekst += '\nKjeften';
                tekst += '\nSkottland';
                bot.sendMessage({ to: channelID, message: tekst });
        }
    }
}
