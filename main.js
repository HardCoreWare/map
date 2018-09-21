// new map class
var map = new Map("map",[19,-99],12,'satellite');

// new route class
var route = new Route(map.getMap(),[[19,-99],[19,-99]]);

/*
function to:

   -add points to the route 
   -set the map the center

*/
$("#btnAdd").click(function(){

    // values from the text boxes
    var lat = $("#txtLat").val();
    var lng = $("#txtLng").val();

    // validates the form
    if((lat!="")&&(lng!="")){

        // Creates and adds point to the route
        var point = [parseFloat(lat),parseFloat(lng)];
        route.addPoint(point);

    }
    
});


