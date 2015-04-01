var color = "#0f0";
/**
 * Function to map 0-360 to 0-255
 * https://github.com/FastLED/FastLED/issues/147
 */
Number.prototype.map = function () {
    return Math.round((this - 0) * (255 - 0) / (360 - 0) + 0);
};

Raphael(function () {
    var reg = /^#(.)\1(.)\2(.)\3$/,
    cp = Raphael.colorpicker(0, 0, 200, "#eee", "picker");
    
    cp.onchange = function (color) {
        $("#picker").data("color", color);
//        var hsv_object = Colors.hex2hsv(color);
//        console.log(hsv_object);
        
//        var send_this =
//                ("000" + hsv_object.H.map()).substr(-3, 3) +
//                ("000" + hsv_object.S.map()).substr(-3, 3) +
//                ("000" + hsv_object.V.map()).substr(-3, 3);
        
//        console.log(send_this);
//        publish(send_this, topic + 'bitmap', 2);
        
    };
});

host = 'shineupon.me';
port = 9001;
topic = '/hackaveiro/';
last_message_time = Date.now();

//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client(host, port, "myclientid_" + parseInt(Math.random() * 100, 10));

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
    //Depending on your scenario you could implement a reconnect logic here
    $("#messages").append("connection lost: " + responseObject.errorMessage);
};

//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
    //Do something with the push message you received
    last_message_time = Date.now();
    $('#messages').append('<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span>');
};

//Connect Options
var options = {
    timeout: 3,
    //Gets Called if the connection has sucessfully been established
    onSuccess: function () {
        $("#messages").append("Connected");
        client.subscribe(topic + '#', {qos: 2});
    },
    //Gets Called if the connection could not be established
    onFailure: function (message) {
        $("#messages").append("Connection failed: " + message.errorMessage);
    }
};

//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
    //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
    var message = new Messaging.Message("" + payload);
    message.destinationName = topic;
    message.qos = qos;

    if ((Date.now() - last_message_time) > 250) {
        last_message_time = Date.now();
        client.send(message);
    }
};

$(document).ready(function () {
    client.connect(options);
    
    isMouseDown = false;
    $('td').mousedown(function() {
        isMouseDown = true;
        $(this).css({backgroundColor:'red'});
    }).mouseup(function() {
        isMouseDown = false;
    });

    $('td').hover(function() {
        if(isMouseDown)
            $(this).css({backgroundColor:'orange'});
    });
    
    $("td").on("touchmove", function (event){
        var coords = event.originalEvent.touches[0];
        if($(document.elementFromPoint(coords.clientX, coords.clientY)).is("td")){
            $(document.elementFromPoint(coords.clientX, coords.clientY)).css({backgroundColor:'green'});
        }
    });
    
    // Responsive grid...
    function responsiveGrid(){
        if($(window).height() > $(window).width()){
            $("#grid").height($( window ).width());
            $("#grid").width($( window ).width());
        } else {
            $("#grid").height($( window ).height());
            $("#grid").width($( window ).height());
        }
    }
    responsiveGrid();
    
    $(window).on("orientationchange resize",function(){
        responsiveGrid();
    });
    
    // Detect changes
//    var ColorMatrix = [];
//    for(var i=0; i<9; i++) {
//        ColorMatrix[i] = new Array(9);
//    }
    setInterval(function (){
//        var changesInColorMatrix = [];
        $("#grid").children().children().each(function (row_index, row){
//            ColorMatrix[index] = [];
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

//                publish(send_this, topic + 'bitmap', 2);
                
            });
            
                console.log(send_this);
        });
        console.log("------------------------");
    }, 1000);
    
});