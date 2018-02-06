var funk = require('./funksjoner.js');

module.exports = {
    //Args er ordene fra meldingen splittet opp, i er i fra løkka
    konverter: function (channelID, bot, args, i) {
        var respons = '';
        var c = false; //changed?
        var unit = args[i + 1];
        switch (unit.toLowerCase()) {
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

            case 'mph':
                respons = funk.convert(args[i], 0, 1.609344, 'mph', 'km/h');
                c = true;
                break;

            case 'fahrenheit':
                respons = funk.convert(args[i], -32, (5 / 9), 'Fahrenheit', 'Celsius');
                c = true;
                break;

            case '°f':
                respons = funk.convert(args[i], -32, (5 / 9), '°F', '°C');
                c = true;
                break;

            case 'kelvin':
                respons = funk.convert(args[i], -272.15, 1, 'Kelvin', 'Celsius');
                c = true;
                break;

            case 'k':
                respons = funk.convert(args[i], -272.15, 1, 'K', '°C');
                c = true;
                break;

            case 'bhp':
                respons = funk.convert(args[i], 0, 0.73549875, 'bhp', 'kW');
                c = true;
                break;

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