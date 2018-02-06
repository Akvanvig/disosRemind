var funk = require('./funksjoner.js');

module.exports = {
    lyder: function (user, userID, channelID, message, serverID, client) {
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

            default:
                var tekst = 'Leave:';
                tekst += '\n\t\tTvinger bot-en til å forlate kanalen';
                tekst = '\n\n Lyder lagt inn:';
                tekst += '\nJodel';
                tekst += '\nKristian';
                tekst += '\nT2:';
                tekst += '\n\t\t+T2';
                tekst +='\n\t\t+T2 full';
                tekst += '\nPrank';
                tekst += '\nVibrator';
                bot.sendMessage({ to: channelID, message: tekst });
        }
    }
}