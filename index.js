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
var matrix = "0000000000000000000012900000000000000000000000000058A00000000, 100000000000000000003690000000000000000000000000009FF00012900, 2000000000000000000058A00000000000000000000000000000000036900, 300000000000000000009FF00012900000000000000000000000000058A00, 400000001290000000000000003690000000001290000000000000009FF00, 5000000036900000000000000058A00000000036900000000000000000000, 6000000058A0000000000000009FF00000000058A00000000000000000000, 700000009FF0000000000000000000000000009FF00000000000000000000, 8000000000000000000000000000000000000000000000000012900000000, 9000000000000000000000000000000000000000000000000036900000000";

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
	if(parseInt((Date.now()-dat_mode)/1000) >= 300){
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
