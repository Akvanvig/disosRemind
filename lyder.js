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
                
            case 'skottland':
                var tall = parseInt(Math.random() * 23);
                switch (tall.toString()) {
                    case '0':
                        funk.playAudio(vcID, './media/too_hard.mp3', bot);
                        break;
                    case '1':
                        funk.playAudio(vcID, './media/keep_wanking_me_off_im_staring_to_get_soft.mp3', bot);
                        break;
                    case '2':
                        funk.playAudio(vcID, './media/im_starting_to_get_soft.mp3', bot);
                        break;
                    case '3':
                        funk.playAudio(vcID, './media/nava_tuu_hard.mp3', bot);
                        break;
                    case '4':
                        funk.playAudio(vcID, './media/keep_wanking_me.mp3', bot);
                        break;
                    case '5':
                        funk.playAudio(vcID, './media/sock_me_off.mp3', bot);
                        break;
                    case '6':
                        funk.playAudio(vcID, './media/how_does_that_cock_in_ur_mouth_taste.mp3', bot);
                        break;
                    case '7':
                        funk.playAudio(vcID, './media/taste_et.mp3', bot);
                        break;
                    case '8':
                        funk.playAudio(vcID, './media/oh_ooh_yee.mp3', bot);
                        break;
                    case '9':
                        funk.playAudio(vcID, './media/oooohhh.mp3', bot);
                        break;
                    case '10':
                        funk.playAudio(vcID, './media/suck_my_balls.mp3', bot);
                        break;
                    case '11':
                        funk.playAudio(vcID, './media/take_et.mp3', bot);
                        break;
                    case '12':
                        funk.playAudio(vcID, './media/lick_my_balls.mp3', bot);
                        break;
                    case '13':
                        funk.playAudio(vcID, './media/waaaat_taki_da_da_da.mp3', bot);
                        break;
                    case '14':
                        funk.playAudio(vcID, './media/lick_my_ballz.mp3', bot);
                        break;
                    case '15':
                        funk.playAudio(vcID, './media/you_got_a_big_ass_and_i_love_shaging_et.mp3', bot);
                        break;
                    case '16':
                        funk.playAudio(vcID, './media/i_love_shagin_et.mp3', bot);
                        break;
                    case '17':
                        funk.playAudio(vcID, './media/you_darty_fakin_slut.mp3', bot);
                        break;
                    case '18':
                        funk.playAudio(vcID, './media/suck_my_cock_quick.mp3', bot);
                        break;
                    case '19':
                        funk.playAudio(vcID, './media/grab_et.mp3', bot);
                        break;
                    case '20':
                        funk.playAudio(vcID, './media/get_my_cock.mp3', bot);
                        break;
                    case '21':
                        funk.playAudio(vcID, './media/noooh_she.mp3', bot);
                        break;
                    case '22':
                        funk.playAudio(vcID, './media/uaaaah.mp3', bot);
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
                tekst += '\nSkottland';
                bot.sendMessage({ to: channelID, message: tekst });
        }
    }
}
