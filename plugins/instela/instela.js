var request = require("request");
require('request-debug')(request);
require("tls").DEFAULT_ECDH_CURVE = "auto"

exports.commands = [
	"fav"
]

/*exports.fav = {
	usage: "<giri numarası>",
	description: "giriyi favlayan kişileri kontrol eder",
	process: function(bot,msg,suffix){
		require("request")("https://tr.instela.com/api/v2/user/?u=thedewil",
		function(err,res,body){
      console.log(body);
			var data = JSON.parse(body);
			if(data){
				msg.channel.send( data.favourites.length)
			}else{
				msg.channel.send( "olmadı")
			}
		});
	}
}*/

exports.fav = {
	usage: "<user(s)>",
	description: "returns information about the given twitch user(s)",
	process: function(bot,msg,suffix){
		request({
			url: "https://tr.instela.com/api/v2/user/?u=thedewil"
		},
		function(err,res,body){
			//var stream = JSON.parse(body);
            console.log(body+msg+err);
		});
	}
}
