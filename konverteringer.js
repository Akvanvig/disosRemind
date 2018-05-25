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

            case 'oz':
            case 'ounze':
                respons = funk.convert(args[i], 0, 28.349523125, 'oz', 'gram');
                c = true;
                break;

            case 'mi':
            case 'miles':
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

            case 'k':
            case 'kelvin':
                respons = funk.convert(args[i], -272.15, 1, 'K', '\u00b0C');
                c = true;
                break;

            case 'bhp':
            case 'hk':
                respons = funk.convert(args[i], 0, 0.73549875, 'hk', 'kW');
                c = true;
                break;

            case 'ms':
            case 'millisekund':
            case 'millisecond':
                respons = args[i] + ' ms er ' + funk.calcTime(args[i]);
                c = true;
                break;

            case 'fl':
            case 'fluid':
                if (args.length > 2 && (args[i+2].toLowerCase() == 'oz' || args[i+2].toLowerCase() == 'ounze')) {
                    respons = funk.convert(args[i], 0, 29.5735295625, 'fl oz', 'ml');
                    c = true;
                }
                break;

            case 'pt':
            case 'pints':
                respons = funk.convert(args[i], 0, 0.473176473, 'pints', 'liter');
                c = true;
                break;
        }

        if (c) {
            bot.sendMessage({ to: channelID, message: respons });
        }
    }
}
