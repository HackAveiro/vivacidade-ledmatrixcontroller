/**
 * Function to map 0-360 to 0-255
 * https://github.com/FastLED/FastLED/issues/147
 */
Number.prototype.map = function () {
    return Math.round((this - 0) * (255 - 0) / (360 - 0) + 0);
};

host = 'broker.mqtt-dashboard.com';
port = 8000;
topic = '/hackaveiro/';


// Create a client instance
client = new Paho.MQTT.Client(host, Number(port), "clientId_" + parseInt(Math.random() * 100, 10));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({timeout: 3, onSuccess:onConnect, cleanSession: true, mqttVersion: 3});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  //client.subscribe("/World");
  
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

// Responsive grid...
function responsiveGrid(){
    setInterval(function (){
        if($(".scroll-content:eq(0)").height() > $(".scroll-content:eq(0)").width()){
            $("#grid").height($(".scroll-content:eq(0)").width());
            $("#grid").width($(".scroll-content:eq(0)").width());
        } else {
            $("#grid").height($(".scroll-content:eq(0)").height());
            $("#grid").width($(".scroll-content:eq(0)").height());
        }
    }, 1000);
}

$(document).ready(function () {
    
    setInterval(function (){
        $("#grid").children().children().each(function (row_index, row){
            var send_this = row_index;
            $(row).children().each(function (col_index,col){
                var color = $(col).css("background-color").replace("rgb(", "").replace("rgba(", "").replace(")", "").split(",");
                color = (Colors.rgb2hsl(color));
                
                send_this +=
                        ("000" + color.H.map()).substr(-3, 3) +
                        ("000" + color.S.map()).substr(-3, 3) +
                        ("000" + color.L.map()).substr(-3, 3);
            });
            message = new Paho.MQTT.Message(send_this);
            message.destinationName = topic + 'bitmap';
            client.send(message);
        });
    }, 1000);
    
});
