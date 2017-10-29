jQuery(document).ready(function($) {
	var api_key = $("input[type='text']").val();
	var incoming = null;
	var showAlert = true;
	
	//model
	var sendAPIcall = function(targetURL, jsonP, callback) {
		if (jsonP == false) {
			$.ajax({
				type: "GET",
				url: targetURL,
				success: function(data) {
					return callback(false, data);
				}
			});
		}
		else {
			$.ajax({
				type: "GET",
				url: targetURL,
				dataType: "jsonp",
				cache: false,
				timeout: 5000,
				success: function(data) { 
					return callback(false, data);
				},
				error: function() {
					if (showAlert == true)
						APIErrorMessage("ERROR with MiningHubPool API or your API Key. Please double check your API Key and try again.");
					$(".entry-content img").hide();
					showAlert = false;
				}
			});
		}
	};
	
	//views
	function getMUSIC_USDprice(outgoing, incoming) {
		if (outgoing == true)
			sendAPIcall("https://api.coinmarketcap.com/v1/ticker/musicoin/?convert=USD", false, getMUSIC_USDprice);
		else {
			price_per_MC = Math.round(incoming[0]["price_usd"] * 10000) / 10000;
			$(".entry-header h2 b:first-child").html("$"+price_per_MC);
			getMUSIC_DBData(true, null); //this is here only because it needs the price pulled before running
		}
	}
	
	function getMUSIC_difficulty(outgoing, incoming) {
		if (outgoing == true)
			sendAPIcall("https://musicoin.miningpoolhub.com/index.php?page=api&action=getdifficulty&api_key=" + api_key, true, getMUSIC_difficulty);
		else {
			var MC_difficulty = Math.round(incoming["getdifficulty"]["data"] / 1000000).toLocaleString();
			$(".entry-header h2 b.current-diff").html(MC_difficulty + "M");
		}
	}

	function getMUSIC_DBData(outgoing, incoming) {
		if (outgoing == true)
			sendAPIcall("https://musicoin.miningpoolhub.com/index.php?page=api&action=getdashboarddata&api_key=" + api_key, true, getMUSIC_DBData);
		else {
			var confirmed_bal = incoming['getdashboarddata']['data']['balance']['confirmed'];
			$(".mus-balanceConf.stats-box div").html(confirmed_bal);
			var unconfirmed_bal = incoming['getdashboarddata']['data']['balance']['unconfirmed'];
			$(".mus-balanceUnConf.stats-box div").html(unconfirmed_bal);
			var personal_hashrate = incoming['getdashboarddata']['data']['personal']['hashrate'];
			personal_hashrate = Math.round(personal_hashrate * 10) / 10;
			$(".personal-hashrate.stats-box div").html(personal_hashrate + " MH/s");
			var recent_credits_24hours = incoming['getdashboarddata']['data']['recent_credits_24hours']['amount'];
			$(".mus-24hrCredits.stats-box div").html(recent_credits_24hours);
			$(".mus-24hrProfit.stats-box div").html("$" + Math.round((recent_credits_24hours * price_per_MC) * 100)/100);
			$(".mus-monthlyProfits.stats-box div").html("$" + Math.round(((recent_credits_24hours * price_per_MC) * 30) * 100)/100);
			$(".mus-yearlyProfits.stats-box div").html("$" + Math.round(((recent_credits_24hours * price_per_MC) * 365) * 100)/100);
		}
	}
	
	function getMUSIC_userWorkers(outgoing, incoming) {
		if (outgoing == true)
			sendAPIcall("https://musicoin.miningpoolhub.com/index.php?page=api&action=getuserworkers&api_key=" + api_key, true, getMUSIC_userWorkers);
		else {
			$(".workers-wrapper").empty();
			for (var i = 0; i < incoming["getuserworkers"]["data"].length; i++) {
		    if (incoming["getuserworkers"]["data"][i]["monitor"] == 1) {
		    	var worker_username = incoming["getuserworkers"]["data"][i]["username"];
		    	var worker_hashrate = (Math.round((incoming["getuserworkers"]["data"][i]["hashrate"] / 1000) * 10) / 10);
		    	$(".workers-wrapper").append("<div class='col-sm-4'><div class='row bg-info worker stats-box'><h4>" + worker_username + "</h4>" + worker_hashrate + " MH/s</div></div>");
		    }
			}
		}
	}
	
	function APIErrorMessage(errorMessage) {
		$('.entry-header').prepend('<h3 style="color: #F00">'+errorMessage+'</h3>');
	}
	
	function getMUSIC_runner() {
		getMUSIC_USDprice(true, null);
		getMUSIC_difficulty(true, null);
		getMUSIC_userWorkers(true, null);
		console.log('API calls completed');
	}
	
	//init
	function main(assignedInterval) {
		setInterval(function() {
			getMUSIC_runner();
		},assignedInterval);
	}
	getMUSIC_runner();
	main(120000);
});
