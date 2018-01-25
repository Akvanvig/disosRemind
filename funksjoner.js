function RemindMe(uid, time, chid, text, bot) {
    if (isNumeric(time)) {
        if (time > 0 && time % 1 == 0) {
            bot.sendMessage({ to: chid, message: 'Du vil f� en p�minnelse om ' + time + ' minutter' });
            return 
        }
        else {
            bot.sendMessage({ to: chid,})
        }
    }
    else {
        bot.sendMessage({ to: chid, message: 'err0r not a number' });
    }

    //Mangler metode for � sortere s� neste alarm havner nederst (kan da bruke pop p� array for � fjerne siste element)
    module.exports = class Reminder {
        //Takes in time for alarm, userID that requested reminder, channelID it was requested in and text requested
        constructor(time, uid, chid, text) {
            this.time = time;
            this.uid = uid;
            this.chid = chid;
            this.text = text;
        }

        getTime() {
            return this.time;
        }

        sendReminder() {
            bot.sendMessage({ to: this.chid, message: '<@!' + this.uid + '> ' + this.text });
        }
    };

export function isInteger(num) {
    return !isNaN(parseInt(num)) && isFinite(num);
}