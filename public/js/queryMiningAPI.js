jQuery(document).ready(function($) {
	function connectToAPI() {
		var api_key = $("input[type='text']").val();
		$.ajax({
			type: "GET",
			//dataType: "json",
			url: "https://api.coinmarketcap.com/v1/ticker/musicoin/?convert=USD",
			success: function(data) { 
				var price_per_MC = Math.round(data[0]["price_usd"] * 10000) / 10000;
				$(".entry-header h2 b:first-child").html("$"+price_per_MC);
				//start second AJAX call
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					cache: false,
					timeout: 5000,
					url: "https://musicoin.miningpoolhub.com/index.php?page=api&action=getdifficulty&api_key=" + api_key,
					success: function(data) {
						var MC_difficulty = Math.round(data["getdifficulty"]["data"] / 1000000).toLocaleString();
						$(".entry-header h2 b.current-diff").html(MC_difficulty + "M");
						//start third AJAX call
						$.ajax({
							type: "GET",
							dataType: "jsonp",
							cache: false,
							url: "https://musicoin.miningpoolhub.com/index.php?page=api&action=getdashboarddata&api_key=" + api_key,
							success: function(data) {
								var confirmed_bal = data['getdashboarddata']['data']['balance']['confirmed'];
								$(".mus-balanceConf.stats-box div").html(confirmed_bal);
								var unconfirmed_bal = data['getdashboarddata']['data']['balance']['unconfirmed'];
								$(".mus-balanceUnConf.stats-box div").html(unconfirmed_bal);
								var personal_hashrate = data['getdashboarddata']['data']['personal']['hashrate'];
								personal_hashrate = Math.round(personal_hashrate * 10) / 10;
								$(".personal-hashrate.stats-box div").html(personal_hashrate + " MH/s");
								var recent_credits_24hours = data['getdashboarddata']['data']['recent_credits_24hours']['amount'];
								$(".mus-24hrCredits.stats-box div").html(recent_credits_24hours);
								$(".mus-24hrProfit.stats-box div").html("$" + Math.round((recent_credits_24hours * price_per_MC) * 100)/100);
								$(".mus-monthlyProfits.stats-box div").html("$" + Math.round(((recent_credits_24hours * price_per_MC) * 30) * 100)/100);
								$(".mus-yearlyProfits.stats-box div").html("$" + Math.round(((recent_credits_24hours * price_per_MC) * 365) * 100)/100);
								//start fourth AJAX call
								$.ajax({
									type: "GET",
									dataType: "jsonp",
									timeout: 5000,
									cache: false,
									url: "https://musicoin.miningpoolhub.com/index.php?page=api&action=getuserworkers&api_key=" + api_key,
									success: function(data) {
										$(".workers-wrapper").empty();
										for (var i = 0; i < data["getuserworkers"]["data"].length; i++) {
									    if (data["getuserworkers"]["data"][i]["monitor"] == 1) {
									    	var worker_username = data["getuserworkers"]["data"][i]["username"];
									    	var worker_hashrate = (Math.round((data["getuserworkers"]["data"][i]["hashrate"] / 1000) * 10) / 10);
									    	$(".workers-wrapper").append("<div class='col-sm-4'><div class='row bg-info worker stats-box'><h4>" + worker_username + "</h4>" + worker_hashrate + " MH/s</div></div>");
									    }
										}
									}
								});
							},
						});
					},
					error: function() {
						alert("ERROR: Please check your API key and try again.");
						$(".entry-content img").hide();
					}
				});
			}
		});
	}
	connectToAPI();
	setInterval(function(){
		connectToAPI();
	},120000);
});