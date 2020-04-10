var request = require("request");

exports.commands = [
"fav",
"kim"
]



exports.fav = {
	usage: "<nick>",
	description: "instela kullanıcına ait bilgileri sorgular",
	process: function(bot,msg,suffix){
		axios.get("https://tr.instela.com/api/v2/entries/"+suffix+"/favourites", {
			headers: {
				'Accept': 'application/json'
			},
			responseType: 'json'
		}).then(response => {

			let kacFav = response.data.favourites.length;
			let giriUrl = "https://tr.instela.com/search?q=%23"+suffix+"&source=enter";
			if (kacFav == 0) {

				msg.channel.send("#" + suffix + " numaralı giri hiç fav almamış. Yazının bağlantısı: <" + giriUrl + ">");

			} else {

				let ekleyenler = "";
				for (var i = 0; i < kacFav; i++) {
					ekleyenler += "'" + response.data.favourites[i].user.username + "'";
					if(i+1 < kacFav) ekleyenler+= ", ";
				}
	        	//ekleyenler = ekleyenler.substring(0, ekleyenler.length - 2);
	        	console.log("#" + suffix + " numaralı giri " + kacFav + " kez favorilenmiş. Favorilerine ekleyenler: " + ekleyenler);
	        	console.log(giriUrl);
	        	msg.channel.send("#" + suffix + " numaralı giri " + kacFav + " kez favorilenmiş. Favorilerine ekleyenler: " + ekleyenler + ". Yazının bağlantısı: <" + giriUrl + ">");

	        }


	    }).catch(error => {
	    	msg.channel.send("yapamadık :(")
	    });
	}
},


exports.kim = {
	usage: "<nick>",
	description: "instela kullanıcına ait bilgileri sorgular",
	process: function(bot,msg,suffix){
		var headersOpt = {
			"content-type": "application/json",
			"user-agent": "instela.fm discord"
		};
		request({
			method:'GET',
			url:'https://fm.instela.com/api3.php?nick=' + encodeURI(suffix),
			headers: headersOpt,
			json: true,
		},
		function(err,res,body){
			msg.channel.send({embed: {
				"description": body.user.username + " adlı yazarın instela bilgileri:",
				"fields": [
				{
					"name": "Puan",
					"value": body.sum,
					"inline": true
				},
				{
					"name": "Toplam Giri",
					"value": body.details[0].count,
					"inline": true
				},
				{
					"name": "Yazarlık Süresi",
					"value": body.details[0].count + " gün",
					"inline": true
				}
				],
				"author": {
					"name": body.user.username,
					"url": body.user.profile_url,
					"icon_url": body.user.bigavatar
				},
				"thumbnail": {
					"url": body.user.bigavatar
				},
				"color": 14177041
			}
		})
		});
	}
}
