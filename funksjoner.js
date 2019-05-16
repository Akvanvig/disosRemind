var fs = require('fs');
var Reminder = require('./Reminder.js');

module.exports = {
    isInteger: function(num) {
        return !isNaN(parseInt(num)) && isFinite(num);
    },

    isNumeric: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    calcTime: function (time) {
        var respons = '';
        var s = 0, m = 0, h = 0, d = 0, y = 0;
        if (time >= 1000) {
            s = (time - (time % 1000)) / 1000;
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
    },

    checkLastReminder: function(reminders, bot, logger) {
        var lengde = reminders.length;
        if (lengde > 0 && reminders[lengde - 1].finishTime <= new Date().getTime()) {
            if (reminders[lengde - 1].finishTime >= new Date().getTime() + 60000) {
                var tid = new Date(reminders[lengde - 1].finishTime).toISOString();
                tid = tid.replace(/T/, ' ');
                tid = tid.replace(/\..+/, '');
                bot.sendMessage({ to: reminders[lengde - 1].channelID, message: '<@!' + reminders[lengde - 1].userID + '> ' + reminders[lengde - 1].reqText + '[ ' + tid + ' ]' });
            } else {
                bot.sendMessage({ to: reminders[lengde - 1].channelID, message: '<@!' + reminders[lengde - 1].userID + '> ' + reminders[lengde - 1].reqText });
            }

            //fjerner reminder
            reminders.pop();
            this.saveReminders(reminders);
            logger.info('Påminnelse sendt');
        }
        return reminders
    },

    checkActive: function(bot, logger) {
        logger.info(bot.username + ' aktiv - ' + Date());
    },

    checkroblx: function(bot, roblxActive) {
        var filsti = './media/img/roblx/';
        var filnavn = ['rob1.png', 'rob2.png'];
        var lengde = roblxActive.length;
        if (lengde > 0 && roblxActive[lengde - 1][1] <= new Date().getTime()) {
            var tall = parseInt(Math.random() * filnavn.length);
            bot.sendMessage({ to: roblxActive[lengde - 1][0], message: 'CALM YOUR BLOXES, ROBLOX MODE IS NOW OFF' });
            bot.uploadFile(roblxActive[lengde - 1][0], filsti + filnavn[tall]);
            bot.uploadFile( {to: roblxActive[lengde - 1][0], file: filsti + filnavn[tall]} );
            //avslutter roblxMode
            roblxActive.pop();
        }
        return roblxActive;
    },

    kys: function() {
        var respons = "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I ";
        respons += "extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.";
        return respons;
    },

    //Brukes for å spille av enkeltklipp
    playAudio: function(voiceChannelID, relativeFilepath, bot) {
        //Let's join the voice channel, the ID is whatever your voice channel's ID is.
        bot.joinVoiceChannel(voiceChannelID, function (error, events) {
        //Check to see if any errors happen while joining.
        if (error) return console.error(error);
            //Then get the audio context
            bot.getAudioContext(voiceChannelID, function (error, stream) {
            //Once again, check to see if any errors exist
            if (error) return console.error(error);

                //Create a stream to your file and pipe it to the stream
                //Without {end: false}, it would close up the stream, so make sure to include that.
                fs.createReadStream(relativeFilepath).pipe(stream, { end: false });

                //The stream fires `done` when it's got nothing else to send to Discord.
                stream.on('done', function () {
                    bot.leaveVoiceChannel(voiceChannelID);
                });
            });
        });
    },

    //Brukes for å spille av flere sanger i tilfeldig rekkefølge
    playRnd: function(voiceChannelID, serverID, stiSanger, antSanger, channelID, bot, logger) {
        bot.joinVoiceChannel(voiceChannelID, function (error, events) {
        if (error) return console.error(error);
            bot.getAudioContext(voiceChannelID, function (error, stream) {
            if (error) return console.error(error);
                //Når cut når 0, vil boten slutte å spille av, og forlate voicechannel
                try {
                  var cut = antSanger;
                  var startet = 0;
                  var sjekkSang = setInterval(function () {
                    if (cut > 0 && startet != cut && bot.servers[serverID].members[bot.id].voice_channel_id == voiceChannelID) {
                      var rnd = Math.floor(Math.random() * stiSanger.length)
                      fs.createReadStream(stiSanger[rnd]).pipe(stream, { end: false }); //Velger tilfeldig sang fra idSanger
                      startet = cut;
                    }
                    if (cut < 0 || bot.servers[serverID].members[bot.id].voice_channel_id != voiceChannelID) {
                      bot.leaveVoiceChannel(voiceChannelID);
                      clearInterval(sjekkSang);
                      logger.info('Listeavspilling fullført');
                    }
                  }, 2000);
                  stream.on('done', function () {
                      cut--;
                  });
                } catch (e) {
                  logger.info('Listeavspilling feilmelding:');
                  logger.info(e);
                }

            });
        });
    },

    convert: function(value, add, multiple, unit1Name, unit2Name) {
        var unit = Math.round((+value + add) * multiple * 100) / 100;
        return value + ' ' + unit1Name + ' = ' + unit + ' ' + unit2Name;
    },

    roblxify: function(userID, chID, message, bot, evt, logger) {
        var msgID = evt.d.id;
        var msg = message.split('');
        for (var i = 0; i < msg.length; i++) {
            var j = msg[i].charCodeAt(0);
            if (i % 2 == 0) { //Gjør små bokstaver store
                if ((j > 96 && j < 123) || j == 229 || j == 230 || j == 248 ) {
                    j -= 32;
                }
            }

            else { //Gjør store bokstaver små
                if ((j > 64 && j < 91) || j == 197 || j == 198 || j == 216) {
                    j += 32;
                }
            }
            if (j == 64) { j--;} //alfakrøll endres
            msg[i] = j;
        }
        for (var i = 0; i < msg.length; i++) {
            msg[i] = String.fromCharCode(msg[i]);
        }
        //Kan ikke endre andre brukeres meldinger
        //bot.editMessage({ channel: chID, messageID: msgID, message: msg.join('') });
        bot.deleteMessage({channelID: chID, messageID: msgID});
        bot.sendMessage({to: chID, message: '<@!' + userID + '> :' + msg.join('')});
    },

    multiplyList: function(listNum) {
        res = 1;
        for (var i = 0; i < listNum.length; i++) {
            res *= listNum[i];
        }
        return res;
    },

    //Tar inn to lister, og fjerner de som er like (Går ut fra at listene er sorterte)
    removeCommon: function(list1, list2) {
        i = 0;
        j = 0;
        while (i < list1.length && j < list2.length) {
            if (list1[i] == list2[j]) {
                list1.splice(i, 1);
                list2.splice(j, 1);
            }
            else if (list1[i] > list2[j]) {
                j++;
            }
            else if (list1[i] < list2[j]) {
                i++;
            }
        }
        return [list1, list2];
    },

    //Faktoriserer et tall, eks. 12 = 2 * 2 * 3
    factorize: function(num) {
        primes = module.exports.getPrimes(Math.ceil(num / 2));
        factors = [];
        notOne = num != 1;

        while (notOne) {
            var notChanged = true;
            for (var i = 0; i < primes.length; i++) {
                if (num % primes[i] == 0) {
                    factors.push(primes[i]);
                    num /= primes[i];
                    notOne = num != 1;
                    notChanged = false;
                    break;
                }
            }
            if (notChanged) {
                factors.push(parseInt(num));
                notOne = false;
            }
        }
        return factors

    },

    //Returnerer alle primtall under gitt tall
    getPrimes: function(num) {
        list = [2];
        if (num > 2) {
            for (var i = 2; i < num; i++) {
                isPrime = true;
                for (var j = 0; j < list.length; j++) {
                    if (i % list[j] == 0) {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime) {
                    list.push(i);
                }
            }
        }
        return list;
    },

    noterEveryone: function(discordUserID, discordName, serverID) {
        //Reads the current registers from file
        fs.readFile('./filer/everyone.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data);

                //Searches for given user on given channel in register
                found = false;
                for (var i = 0; i < obj.table.length; i++) {
                    //If found increses count by one on correct user, and updates name if changed
                    if (obj.table[i].userID == discordUserID && obj.table[i].server == serverID) {
                        found = true;
                        obj.table[i].count += 1;
                        obj.table[i].name = discordName;
                        break;
                    }
                }
                //If not found, will register a new occurence
                if (!found) {
                    obj.table.push({userID: discordUserID, name: discordName, server: serverID, count: 1});
                }

                //Converts back to Json, and stores in file
                json = JSON.stringify(obj);
                fs.writeFile('./filer/everyone.json', json, 'utf8', function writeCallback(err) {if (err) { console.log(err)}});
            }
        });
    },

    lesEveryone: function(serverID, channelID, bot) {
        fs.readFile('./filer/everyone.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data);
                text = 'Følgende brukere har brukt everyone på denne kanalen (Navn - antall)';
                for (var i = 0; i < obj.table.length; i++) {
                    if (obj.table[i].server == serverID) {
                        text += '\n' + obj.table[i].name + '\t\t-\t' + obj.table[i].count;
                    }
                }
                bot.sendMessage({to: channelID, message: text});
            }
        });
    },

    saveReminders: function(reminders) {
        //Writes the reminders to file
        json = JSON.stringify(reminders);
        fs.writeFile('./filer/reminders.json', json, 'utf8', function writeCallback(err)
            {if (err) { console.log(err)}
        });
    },

    readReminders: function(logger, callbackReminder) {
        //Reads the reminders from file
        var result = [];
        fs.readFile('./filer/reminders.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                for (var i = 0; i < obj.length; i++) {
                    var variabler = [obj[i].time, obj[i].uid, obj[i].chid, obj[i].text];
                    var temp = new Reminder(false, variabler);
                    result.push(temp);
                }
            }
            callbackReminder(result);
        });
    }
}
//Veldig nra Anders! :)
