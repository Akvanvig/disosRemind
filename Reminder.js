class Reminder {
    //Takes in time for alarm, userID that requested reminder, channelID it was requested in and text requested
    //constructor(time, uid, chid, text, logger) {
    constructor(type, variabler) { //Type er boolean, variabler er en array av variabler
        if (type) {
            var d = new Date();
            this.time = ((variabler[0] * 60 * 1000) + (d.getTime())); //Gis minutter, gjør dette om til milisekunder og legger til nåværende tidspunkt
            this.uid = variabler[1];
            this.chid = variabler[2];
            this.text = variabler[3];
            variabler[4].info('P\u00e5minnelse opprettet');
        } else {
            this.time = variabler[0];
            this.uid = variabler[1];
            this.chid = variabler[2];
            this.text = variabler[3];
        }
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

module.exports = Reminder;
