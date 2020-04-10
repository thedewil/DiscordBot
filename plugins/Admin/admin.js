exports.commands = [
	"adlandır",
	"log",
	"uptime"
]

var startTime = Date.now();

exports.adlandır = {
	description: "botun kullanıcı adını değiştirir. bu işlem saatte iki kez gerçekleştirilebilir.",
	process: function(bot,msg,suffix) {
		bot.user.setUsername(suffix);
	}
}

exports.log = {
	usage: "<log mesajı>",
	description: "bot konsoluna log yazdırır",
	process: function(bot,msg,suffix){console.log(msg.content);}
}

exports.uptime = {
	usage: "",
	description: "bot çalıştırıldığından bu yana geçen toplam süreyi hesaplar.",
	process: function(bot,msg,suffix){
		var now = Date.now();
		var msec = now - startTime;
		console.log("Çalışma süresi " + msec + " milisaniye");
		var days = Math.floor(msec / 1000 / 60 / 60 / 24);
		msec -= days * 1000 * 60 * 60 * 24;
		var hours = Math.floor(msec / 1000 / 60 / 60);
		msec -= hours * 1000 * 60 * 60;
		var mins = Math.floor(msec / 1000 / 60);
		msec -= mins * 1000 * 60;
		var secs = Math.floor(msec / 1000);
		var timestr = "";
		if(days > 0) {
			timestr += days + " gün ";
		}
		if(hours > 0) {
			timestr += hours + " saat ";
		}
		if(mins > 0) {
			timestr += mins + " dakika ";
		}
		if(secs > 0) {
			timestr += secs + " saniye ";
		}
		msg.channel.send("**Toplam Çalışma Süresi**: " + timestr);
	}
}
