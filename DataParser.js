var txt = "000000000000027b0808000001701a47c4e0012f94c1c60423db73005100220900010611080101f00150011505080005415a00090006426bd3180001430cd544000006025762002003c700000000f10000a156100000413200000001701a47c0f8012f94c2fe0423dce80053001e0900010611080101f00150011505080005415a00090006426bd5180001430cd844000006025862002003c700000000f10000a156100000413200000001701a47bd10012f94c4660423ded1005400210900030611080101f00150011505080005415a00090006426bd1180003430cdb44000006025962001f03c700000000f10000a156100000413200000001701a47b158012f94c5bd0423e0320059001e0900060611080101f00150011505080005415a00090006426bca180005430cef44000006025862001b03c700000000f10000a156100000413200000001701a47ad70012f94c6820423e13b005b001f0800060611080101f00150011505080005415a00090006426bca180005430cfd44000006025962001b03c700000000f10000a156100000413200000001701a47a988012f94c7400423e26e005d001f0800060611080101f00150011505080005415a00090006426bc5180005430d0f44000006025862001a03c700000000f10000a156100000413200000001701a47a5a0012f94c7dc0423e378005d001d0700060611080101f00150011505080005415a00090006426bb9180005430d2344005c06025962001903c700000000f10000a156100000413200000001701a479dd0012f94c77f0423e3ac005a001e0700060611080101f00150011505080005415a00090006426bbd180005430d1944006906025862001703c700000000f10000a1561000004132000800005577";



function decode(txt){
    var noOfData = parseInt(txt.substring(18, 20), 16);
    var avlData = txt.slice(20, txt.length);


for (var i = 0; i < noOfData; i++) {
    var timestamp = avlData.substring(0, 16);
    var date = new Date(parseInt(timestamp, 16));
    date = date.toGMTString();

    var gpsElement = avlData.slice(18, 48);
    var longitude = parseInt(gpsElement.substring(0, 8), 16)/10000000;
    var latitude = parseInt(gpsElement.substring(8, 16), 16) / 10000000;
    var altitude = parseInt(gpsElement.substring(16, 20), 16);
    var angle = parseInt(gpsElement.substring(20, 24), 16);
    var satalites = parseInt(gpsElement.substring(24, 26), 16);
    var gpsSpeed = parseInt(gpsElement.substring(26, 30), 16);

    console.log("DateTime : "+date+"\tlatitide: " + latitude + " \tlongitude: " + longitude + " \taltitude: " + altitude + "\t angle: " + angle + "\tsatalite: " + satalites + "\tgpsSpeed: " + gpsSpeed);

    var n1 = parseInt(avlData.substring(52,54),16);
    var ioElement=avlData.slice(54,avlData.length);
    for (var j = 0; j < n1; j++) {
        var id=parseInt(ioElement.substring(0,2),16);
        var val = parseInt(ioElement.substring(2, 4), 16);
        printVal(id,val);
        ioElement=ioElement.slice(4,ioElement.length);
    }
    console.log("------------------------------------");
    var n2 = parseInt(ioElement.substring(0, 2), 16);
    ioElement = ioElement.slice(2, ioElement.length);
    for (var j = 0; j < n2; j++) {
        var id = parseInt(ioElement.substring(0, 2), 16);
        var val = parseInt(ioElement.substring(2, 6), 16);
        printVal(id, val);
        ioElement = ioElement.slice(6, ioElement.length);
    }
    console.log("------------------------------------");
    var n4 = parseInt(ioElement.substring(0, 2), 16);
    ioElement = ioElement.slice(2, ioElement.length);
    for (var j = 0; j < n4; j++) {
        var id = parseInt(ioElement.substring(0, 2), 16);
        var val = parseInt(ioElement.substring(2, 10), 16);
        printVal(id, val);
        ioElement = ioElement.slice(10, ioElement.length);
    }
    console.log("------------------------------------");
    var n8 = parseInt(ioElement.substring(0, 2), 16);
    ioElement = ioElement.slice(2, ioElement.length);
    for (var j = 0; j < n8; j++) {
        var id = parseInt(ioElement.substring(0, 2), 16);
        var val = parseInt(ioElement.substring(2, 18), 16);
        printVal(id, val);
        ioElement = ioElement.slice(18, ioElement.length);
    }
    console.log("------------------------------------");
    avlData=ioElement;
}



}


function printVal(id,val){
    if (avl_io_data.has(id)) {
        if (avl_io_data.get(id).includes("|")) {
            var res = avl_io_data.get(id).split("|");
            console.log(res[0] + " : " + val * parseFloat(res[1]));
        } else {
            console.log(avl_io_data.get(id) + " : " + val);
        }
    } else {
        console.log(id + " : " + val);
    }
}


var avl_io_data = new Map();
avl_io_data.set(239, "Ignition");
avl_io_data.set(240, "Movement");
avl_io_data.set(80, "Data Mode");
avl_io_data.set(21, "GSM Signal");
avl_io_data.set(200, "Sleep Mode");
avl_io_data.set(69, "GNSS Status");
avl_io_data.set(181, "GNSS PDOP|0.1");
avl_io_data.set(182, "GNSS HDOP|0.1");
avl_io_data.set(66, "External Voltage|0.001");
avl_io_data.set(24, "Speed");
avl_io_data.set(205, "GSM Cell ID");
avl_io_data.set(206, "GSM Area Code");
avl_io_data.set(67, "Battery Voltage|0.001");
avl_io_data.set(68, "Battery Current|0.001");
avl_io_data.set(241, "Active GSM Operator");
avl_io_data.set(199, "Trip Odometer	");
avl_io_data.set(16, "Total Odometer");
avl_io_data.set(1, "Digital Input 1	");
avl_io_data.set(9, "Analog Input 1|0.001");
avl_io_data.set(179, "Digital Output 1");
avl_io_data.set(12, "Fuel Used GPS|0.001");
avl_io_data.set(13, "Fuel Rate GPS|0.01");
avl_io_data.set(17, "Axis X");
avl_io_data.set(18, "Axis Y");
avl_io_data.set(19, "Axis Z");
avl_io_data.set(11, "ICCID1");
avl_io_data.set(10, "SD Status");
avl_io_data.set(2, "Digital Input 2");
avl_io_data.set(3, "Digital Input 3");
avl_io_data.set(6, "Analog Input 2|0.001");
avl_io_data.set(180, "Digital Output 2");
avl_io_data.set(72, "Dallas Temperature 1|0.1");
avl_io_data.set(73, "Dallas Temperature 2|0.1");
avl_io_data.set(74, "Dallas Temperature 3|0.1");
avl_io_data.set(75, "Dallas Temperature 4|0.1");
avl_io_data.set(76, "Dallas Temperature ID 1");
avl_io_data.set(77, "Dallas Temperature ID 2");
avl_io_data.set(79, "Dallas Temperature ID 3");
avl_io_data.set(71, "Dallas Temperature ID 4");
avl_io_data.set(78, "iButton");
avl_io_data.set(207, "RFID");
avl_io_data.set(201, "LLS 1 Fuel Level");
avl_io_data.set(202, "LLS 1 Temperature");
avl_io_data.set(203, "LLS 2 Fuel Level");
avl_io_data.set(204, "LLS 2 Temperature");
avl_io_data.set(210, "LLS 3 Fuel Level");
avl_io_data.set(211, "LLS 3 Temperature");
avl_io_data.set(212, "LLS 4 Fuel Level");
avl_io_data.set(213, "LLS 4 Temperature");
avl_io_data.set(214, "LLS 5 Fuel Level");
avl_io_data.set(215, "LLS 5 Temperature");
avl_io_data.set(15, "Eco Score|0.01");
avl_io_data.set(113, "Battery Level");
avl_io_data.set(116, "Charger Connected");
avl_io_data.set(238, "User ID");
avl_io_data.set(25, "BLE 1 Temperature|0.1");
avl_io_data.set(26, "BLE 2 Temperature|0.1");
avl_io_data.set(27, "BLE 3 Temperature|0.1");
avl_io_data.set(28, "BLE 4 Temperature|0.1");
avl_io_data.set(29, "BLE 1 Battery Voltage");
avl_io_data.set(20, "BLE 2 Battery Voltage");
avl_io_data.set(22, "BLE 3 Battery Voltage");
avl_io_data.set(23, "BLE 4 Battery Voltage");
avl_io_data.set(86, "BLE 1 Humidity|0.1");
avl_io_data.set(104, "BLE 2 Humidity|0.1");
avl_io_data.set(106, "BLE 3 Humidity|0.1");
avl_io_data.set(108, "BLE 4 Humidity|0.1");
avl_io_data.set(237, "Network Type	");
avl_io_data.set(8, "Authorized iButton");
avl_io_data.set(4, "Pulse Counter Din1");
avl_io_data.set(5, "Pulse Counter Din2");
avl_io_data.set(263, "BT Status	");
avl_io_data.set(264, "Barcode ID");
avl_io_data.set(269, "Escort LLS Temperature #1");
avl_io_data.set(270, "Escort LLS Fuel level #1");
avl_io_data.set(271, "Escort LLS Battery Voltage #1|0.01");
avl_io_data.set(272, "Escort LLS Temperature #2");
avl_io_data.set(273, "Escort LLS Fuel level #2");
avl_io_data.set(274, "Escort LLS Battery Voltage #2|0.01");
avl_io_data.set(275, "Escort LLS Temperature #3");
avl_io_data.set(276, "Escort LLS Fuel level #3");
avl_io_data.set(277, "Escort LLS Battery Voltage #3|0.01");
avl_io_data.set(278, "Escort LLS Temperature #4");
avl_io_data.set(279, "Escort LLS Fuel level #4");
avl_io_data.set(280, "Escort LLS Battery Voltage #4|0.01");
avl_io_data.set(303, "Instant Movement");
avl_io_data.set(306, "BLE Fuel Frequency #1");
avl_io_data.set(307, "BLE Fuel Frequency #2");
avl_io_data.set(308, "BLE Fuel Frequency #3");
avl_io_data.set(309, "BLE Fuel Frequency #4");
avl_io_data.set(385, "Beacon");
avl_io_data.set(327, "UL202-02 Sensor Fuel level");
avl_io_data.set(483, "UL202-02 Sensor Status");
avl_io_data.set(331, "BLE Sensor 1");
avl_io_data.set(332, "BLE Sensor 2");
avl_io_data.set(333, "BLE Sensor 3");
avl_io_data.set(334, "BLE Sensor 4");
avl_io_data.set(335, "BLE Luminosity 1");
avl_io_data.set(336, "BLE Luminosity 2");
avl_io_data.set(337, "BLE Luminosity 3");
avl_io_data.set(338, "BLE Luminosity 4");
avl_io_data.set(380, "Digital output 3");
avl_io_data.set(381, "GND sense");
avl_io_data.set(387, "ISO6709 Coordinates");
avl_io_data.set(90, "Door Status");
avl_io_data.set(98, "Geofence zone 20");


decode(txt);