exports.commands = [
	"zar"
]

var d20 = require('d20')

exports.zar = {
	usage: "[zar yüzü sayısı] veya [zar adedi]z[zar yüzü sayısı]",
	description: "x yüze sahip bir veya birden fazla zar atın. varsayılan değeri 10'dur.",
	process: function(bot,msg,suffix) {
		if (suffix.split("z").length <= 1) {
			msg.channel.send(msg.author + " " + d20.roll(suffix || "10") + " attı.");
		}
		else if (suffix.split("z").length > 1) {
			var eachDie = suffix.split("+");
			var passing = 0;
			for (var i = 0; i < eachDie.length; i++){
				if (eachDie[i].split("z")[0] < 50) {
					passing += 1;
				};
			}
			if (passing == eachDie.length) {
				msg.channel.send(msg.author + " " + d20.roll(suffix) + " attı.");
			}  else {
				msg.channel.send(msg.author + " aynı anda çok fazla sayıda zar atmaya çalıştı!");
			}
		}
	}
}
