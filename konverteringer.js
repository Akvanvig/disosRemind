var funk = require('./funksjoner.js');

module.exports = {
    //Args er ordene fra meldingen splittet opp, i er i fra l�kka
    konverter: function (channelID, bot, args, i) {
        var respons = '';
        var c = false; //changed?
        var unit = args[i + 1];
        switch (unit.toLowerCase()) {
            //Konvertering gjøres ved å kalle "Convert([Verdi som omgjøres], [Hvor mye som skal legges til], [Hva skal det ganges med], [Enhetsnavn som blir konvertert], [Enhetsnavn det konverteres til])"
            case 'pounds':
            case 'lbs':
                respons = funk.convert(args[i], 0, 0.45359237, 'lbs', 'kg');
                c = true;
                break;

            case 'miles':
            case 'mi':
                respons = funk.convert(args[i], 0, 1.609344, 'miles', 'km');
                c = true;
                break;

            case 'foot':
            case 'feet':
                respons = funk.convert(args[i], 0, 0.3048, 'feet', 'meters');
                c = true;
                break;

            case 'inch':
            case 'inches':
                respons = funk.convert(args[i], 0, 2.54, 'inches', 'centimeter');
                c = true;
                break;

            case 'mph':
                respons = funk.convert(args[i], 0, 1.609344, 'mph', 'km/h');
                c = true;
                break;

            case 'fahrenheit':
            case '\u00b0f':
                respons = funk.convert(args[i], -32, (5 / 9), '\u00b0F', '\u00b0C');
                c = true;
                break;

            case 'kelvin':
            case 'k':
                respons = funk.convert(args[i], -272.15, 1, 'K', '\u00b0C');
                c = true;
                break;

            case 'bhp':
            case 'hk':
                respons = funk.convert(args[i], 0, 0.73549875, 'hk', 'kW');
                c = true;
                break;
        }

        if (c) {
            bot.sendMessage({ to: channelID, message: respons });
        }
    }
}
