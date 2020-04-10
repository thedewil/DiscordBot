exports.commands = [
	"yazar"
]

    exports.yazar = {
        description: "Yazar Bilgisi Verir",
        process: function(bot, msg, suffix) {
            require("request")("https://tr.instela.com/api/v2/user/?u=thedewil",
                function(err, res, body) {
                    var data = JSON.parse(body);
                    if (data && data.text) {
                        msg.channel.send(data.text)
                    }
                });
        }
    },