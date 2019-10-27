//animateMessage: function(bot, messages, messageID, channelID, numLoops, updateTime) {

module.exports = {
    handleAnimation: function(bot, messageID, channelID, message, animateMessage) {
        var args = message.substring(1).split(' ');
        switch (args[0].toLowerCase()) {
            case 'howdy':
                module.exports.howdy(bot, messageID, channelID, animateMessage);
                break;
            case 'howdysplurt':
                module.exports.howdySplurt(bot, messageID, channelID, animateMessage);
                break;
        }
    },

    howdy: function(bot, messageID, channelID, animateMessage) {
        var howdyMsgs = [':thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :eggplant:\n               :zap:8==:punch:D:sweat_drops:\n           :carrot:  :eggplant:\n           :boot:     :boot:',':thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:sweat_drops:\n           :carrot:  :eggplant:                  :sweat_drops:\n           :boot:     :boot:',':thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::nose:\n               :oil:  :nose:\n               :zap:8:punch:==D:sweat_drops:\n           :carrot:  :eggplant:                  :sweat_drops:\n           :boot:     :boot:                   :sweat_drops:',':thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:sweat_drops:\n           :carrot:  :eggplant:                  :sweat_drops:\n           :boot:     :boot:'];
        animateMessage(bot, howdyMsgs, messageID, channelID, 20, 750);
    },
    howdySplurt: function(bot, messageID, channelID, animateMessage) {
        var howdySplurtMsgs = [":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :eggplant:\n               :zap:8==:punch:D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::nose:\n               :oil:  :nose:\n               :zap:8:punch:==D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :eggplant:\n               :zap:8==:punch:D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::nose:\n               :oil:  :nose:\n               :zap:8:punch:==D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:ocean:\n           :carrot:  :eggplant:                  :ocean:\n           :boot:     :boot:                    :ocean:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:ocean::ocean::ocean::ocean::ocean:\n           :carrot:  :eggplant:                  :ocean::ocean::ocean::ocean::ocean:\n           :boot:     :boot:                    :ocean::ocean::ocean::ocean::ocean:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :carrot:  :eggplant:                  :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :boot:     :boot:                    :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :carrot:  :eggplant:                  :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :boot:     :boot:                    :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:",":thumbsup:          :cowboy:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :carrot:  :eggplant:                  :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :boot:     :boot:                    :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:",":thumbsup:          :frowning:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:=D:ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :carrot:  :eggplant:                  :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:\n           :boot:     :boot:                    :ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean::ocean:",":thumbsup:          :frowning:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch::boom:=D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :frowning:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:           =D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :frowning:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:           :red_circle:=D\n           :carrot:  :eggplant:\n           :boot:     :boot:",":thumbsup:          :frowning:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:           :red_circle:\n           :carrot:  :eggplant:                    :red_circle:=D\n           :boot:     :boot:",":thumbsup:          :frowning:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch:           :red_circle:\n           :carrot:  :eggplant:                    :red_circle:\n           :boot:     :boot:                   :red_circle:=D",":thumbsdown:          :sob:\n   :eggplant::zzz::necktie::eggplant:\n               :oil:    :nose:\n               :zap:8=:punch::red_circle:\n           :carrot:  :eggplant:         :red_circle:\n           :boot:     :boot:       :red_circle::red_circle::red_circle:=D"];
        animateMessage(bot, howdySplurtMsgs, messageID, channelID, 1, 750);
    }
}
