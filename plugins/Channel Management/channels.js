exports.commands = [
	"oluştur",
	"ses",
	"sil",
	"sunucular",
	"konu"
]

exports.oluştur = {
	usage: "<kanal adı>",
	description: "verilen isimde yeni bir yazı kanalı oluşturur.",
	process: function(bot,msg,suffix) {
		msg.channel.guild.createChannel(suffix,"text").then(function(channel) {
			msg.channel.send(channel + " oluşturuldu");
		}).catch(function(error){
			msg.channel.send(error + " kanal oluşturulamadı");
		});
	}
}

exports.sunucular = {
description: "botun dahil olduğu sunucuları listeler.",
process: function(bot,msg) {
	msg.channel.send(`__**${bot.user.username} şu anda şu sunuculara katılmış durumda:**__ \n\n${bot.guilds.map(g => `${g.name} - **${g.memberCount} Members**`).join(`\n`)}`, {split: true});
}
},



exports.ses = {
	usage: "<kanal adı>",
	description: "verilen isimde yeni bir ses kanalı oluşturur.",
	process: function(bot,msg,suffix) {
		msg.channel.guild.createChannel(suffix,"voice").then(function(channel) {
			msg.channel.send(channel.id + " oluşturuldu");
			console.log(channel + " oluşturuldu");
		}).catch(function(error){
			msg.channel.send(error + " oluşturulamadı");
		});
	}
},
exports["sil"] = {
	usage: "<kanal adı>",
	description: "belirtilen kanalı siler.",
	process: function(bot,msg,suffix) {
		var channel = bot.channels.get(suffix);
		if(suffix.startsWith('<#')){
			channel = bot.channels.get(suffix.substr(2,suffix.length-3));
		}
		if(!channel){
			var channels = msg.channel.guild.channels.findAll("name",suffix);
			if(channels.length > 1){
				var response = "Birden fazla kanalla eşleşti. Lütfen ID kullanın.";
				for(var i=0;i<channels.length;i++){
					response += channels[i] + ": " + channels[i].id;
				}
				msg.channel.send(response);
				return;
			}else if(channels.length == 1){
				channel = channels[0];
			} else {
				msg.channel.send( suffix + " kanalını silecektik, ama bulamadık!");
				return;
			}
		}
		msg.channel.guild.defaultChannel.send(suffix + " kanalı " + msg.author + " adlı kullanıcın isteği üzerine siliniyor");
		if(msg.channel.guild.defaultChannel != msg.channel){
			msg.channel.send(channel + " siliniyor");
		}
		channel.delete().then(function(channel){
			console.log(suffix + " kanalı " + msg.author + " adlı kullanıcın isteği üzerine siliniyor");
		}).catch(function(error){
			msg.channel.send(error + " kanal silinemedi");
		});
	}
}

exports.konu = {
	usage: "[konu]",
	description: 'kanalın konusunu belirler. konu belirtmezseniz konuyu kaldırır.',
	process: function(bot,msg,suffix) {
		msg.channel.setTopic(suffix);
	}
}
