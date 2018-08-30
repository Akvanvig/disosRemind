//var funk = require('./funksjoner.js');

module.exports = class Reminder {
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

        var respons = '';
        var s = 0, m = 0, h = 0, d = 0, y = 0;
        if (result >= 1000) {
            s = (result - (result % 1000)) / 1000;
            if (s >= 60) {
                m = (s - (s % 60)) / 60;
                s = s - (60 * m);
                if (m >= 60) {
                    h = (m - (m % 60)) / 60;
                    m = m - (60 * h);
                    if (h >= 24) {
                        d = (h - (h % 24)) / 24;
                        h = h - (24 * d);
                        if (y >= 365) {
                            y = (d - (d % 365)) / 365;
                            d = d - (365 * y);
                        }
                    }
                }
            }
        }
        if (y > 0) { respons += y + ' år, '; }
        if (d > 0) { respons += d + ' dager, '; }
        if (h > 0) { respons += h + ' timer, '; }
        if (m > 0) { respons += m + ' min, '; }
        respons += s + ' sek.';
        return respons;

        return respons;
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
