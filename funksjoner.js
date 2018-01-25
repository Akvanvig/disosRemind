module.exports = RemindMe(uid, time, chid, text) {
    if (isNumeric(args[0])) {
        bot.sendMessage({ to: channelID, message: 'Du vil få en påminnelse om ' + args[0] + ' minutter' });
    }
    else {
        bot.sendMessage({ to: channelID, message: 'err0r not a number' });
    }
};

//Mangler metode for å sortere så neste alarm havner nederst (kan da bruke pop på array for å fjerne siste element)
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


};


module.exports = function isInteger(num) {
    return !isNaN(parseInt(num)) && isFinite(num);
};