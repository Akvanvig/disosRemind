var funk = require('./funksjoner.js');
var Player = require('./Player.js');
var audioObjects = []; //For �yeblikket ikke implementert
var sid = "./media/InitialD/";//Sti Initial D
var stiSanger = [sid+'A-Perfect-Hero.mp3', sid+'Chemical-Love.mp3', sid+'Deja-Vu.mp3', sid+'Fly-Me-To-The-Moon-And-Back.mp3',
sid+'Forever-Young.mp3', sid+'Full-Metal-Cars.mp3', sid+'Gas-Gas-Gas.mp3', sid+'Running-in-The-90s.mp3', sid+'The-Top.mp3',
sid+'Dancing.mp3', sid+'Goodbye-Yellow-Brick-Road.mp3', sid+'Love-Is-In-Danger.mp3', sid+'Night-of-Fire.mp3', sid+'No-One-Sleep-In-Tokyo.mp3',
sid+'Space-Boy.mp3'];

module.exports = {
    lyder: function (user, userID, channelID, message, serverID, bot, logger) {
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
            case 'test':
                audioObjects.push(new audioObject(vcID, bot));
                break;

            case 'initiald':
                funk.playID(vcID, serverID, stiSanger, bot);
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
                tekst += '\nInitialD';
                bot.sendMessage({ to: channelID, message: tekst });
        }
    }
}

//kontrollerer avspilling i gitt kanal
class audioObject {

    constructor(voice_channel_id, bot) {
        this.voice_channel_id = voice_channel_id;
        this.bot = bot;
        this.disconnTime = new Date().getTime() + (30 * 60 * 1000);
        this.timer = setTimeout(60*1000, this.leaveVoiceChannel())
        this.bot.joinVoiceChannel(voice_channel_id, function (error, events) { this.joinErr = error; this.joinEvents = events });
    }

    leaveVoiceChannel() {
        this.bot.leaveVoiceChannel(this.voice_channel_id);
    }

}

//playAudio: function(voiceChannelID, relativeFilepath, bot) {
//    //Let's join the voice channel, the ID is whatever your voice channel's ID is.
//    bot.joinVoiceChannel(voiceChannelID, function (error, events) {
//        //Check to see if any errors happen while joining.
//        if (error) return console.error(error);
//        //Then get the audio context
//        bot.getAudioContext(voiceChannelID, function (error, stream) {
//            //Once again, check to see if any errors exist
//            if (error) return console.error(error);

//            //Create a stream to your file and pipe it to the stream
//            //Without {end: false}, it would close up the stream, so make sure to include that.
//            fs.createReadStream(relativeFilepath).pipe(stream, { end: false });

//            //The stream fires `done` when it's got nothing else to send to Discord.
//            stream.on('done', function () {
//                bot.leaveVoiceChannel(voiceChannelID);
//            });
//        });
//    });
//},
