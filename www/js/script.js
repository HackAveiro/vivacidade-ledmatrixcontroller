/**
 * Function to map 0-360 to 0-255
 * https://github.com/FastLED/FastLED/issues/147
 */
Number.prototype.map = function () {
    return Math.round((this - 0) * (255 - 0) / (360 - 0) + 0);
};

//Raphael(function () {
//    var reg = /^#(.)\1(.)\2(.)\3$/,
   // cp = Raphael.colorpicker(0, 0, 200, "#eee", "picker");
    
  //  cp.onchange = function (color) {
     //   $("#picker").data("color", color);
//        var hsv_object = Colors.hex2hsv(color);
//        console.log(hsv_object);
        
//        var send_this =
//                ("000" + hsv_object.H.map()).substr(-3, 3) +
//                ("000" + hsv_object.S.map()).substr(-3, 3) +
//                ("000" + hsv_object.V.map()).substr(-3, 3);
        
//        console.log(send_this);
//        publish(send_this, topic + 'bitmap', 2);
        
   // };
//});

host = 'shineupon.me';
port = 9001;
topic = '/hackaveiro/';


// Create a client instance
client = new Paho.MQTT.Client(host, Number(port), "clientId_" + parseInt(Math.random() * 100, 10));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


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

/*

//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client(host, port, "myclientid_" + parseInt(Math.random() * 100, 10));

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
    //Depending on your scenario you could implement a reconnect logic here
    //$("#messages").append("Connection lost: " + responseObject.errorMessage);
    $("#messages").append("Desligado");
    $("#block").show();
};

//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
    //Do something with the push message you received
    
    //$('#messages').append('<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span>');
};

//Connect Options
var options = {
    timeout: 3,
    cleanSession: true,
    //Gets Called if the connection has sucessfully been established
    onSuccess: function () {
        $("#messages").append("Ligado");
        client.subscribe(topic, {qos: 2});
    },
    //Gets Called if the connection could not be established
    onFailure: function (message) {
        //$("#messages").append("Connection failed: " + message.errorMessage);
        $("#messages").append("Não foi possivel establecer ligação");
        $("#block").show();
    }
};

//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
    //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
    var message = new Messaging.Message("" + payload);
    message.destinationName = topic;
    message.qos = qos;
    client.send(message);
    //localStorage.clear();
};

*/

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
//                if(ColorMatrix[row_index][col_index] != $(col).css("background-color")){
//                    console.log("mudou!");
//                }
//                ColorMatrix[index].push($(elementt).css("background-color"));
                
//                $("#picker").data("color", color);
//                var hsv_object = Colors.hex2hsv(color);
//                console.log(hsv_object);

//                console.log($(col).css("background-color"));


                var color = $(col).css("background-color").replace("rgb(", "").replace("rgba(", "").replace(")", "").split(",");
//                console.log(color);
                color = (Colors.rgb2hsl(color));
                
                send_this +=
                        ("000" + color.H.map()).substr(-3, 3) +
                        ("000" + color.S.map()).substr(-3, 3) +
                        ("000" + color.L.map()).substr(-3, 3);
                
                
                
            });
            message = new Paho.MQTT.Message(send_this);
          message.destinationName = topic + 'bitmap';
          client.send(message);
            //publish(send_this, topic + 'bitmap', 2);
            console.log(send_this);
        });
        console.log("------------------------");
    }, 1000);
    
});