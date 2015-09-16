var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/www'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com');
var dat_mode = Date.now();
var matrix = "0010000000000000000000000000000000000000000000000000000000000, 1000000000000000000000000000000000000000000000000000000000000, 2000000000000000000000000000000000000000000000000000000000000, 3000000000000000000000000000000000000000000000000000000000000, 4000000000000000000000000000000000000000000000000000000000000, 5000000000000000000000000000000000000000000000000000000000000, 6000000000000000000000000000000000000000000000000000000000000, 7000000000000000000000000000000000000000000000000000000000000, 8000000000000000000000000000000000000000000000000000000000000, 9020000000000000000000000000000000000000000000000000000000000";

client.on('connect', function () {
  client.subscribe('/hackaveiro/bitmap');
  client.subscribe('/hackaveiro/mode');
});

client.on('message', function (topic, message) {
	if(topic == "/hackaveiro/mode" && message == "webapp"){
		dat_mode = Date.now();
	}
	//console.log(message.toString());
	//  client.end();
});

setInterval(function(){
	if(parseInt((Date.now()-dat_mode)/1000) >= 5){
		var new_matrix = "";
		matrix.split(", ").forEach(function(element, index){
			if(index==9){
				new_matrix = "0" + element.slice(1) + ", " + new_matrix;
			} else {
				if(index == 8){
					new_matrix += "9" + element.slice(1);
				} else {
					new_matrix += (index+1) + element.slice(1) + ", ";
				}
			}
			client.publish('/hackaveiro/bitmap', element);
		});
		console.log(new_matrix + "\n");
		matrix = new_matrix;
	}
}, 500);
