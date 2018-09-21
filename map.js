class Map {

    constructor(divId,point,zoom,typeId){

        this.map = new google.maps.Map(document.getElementById(divId), {

            center: {lat: point[0], lng: point[1]},
            zoom: zoom,
            mapTypeId: typeId

        });

    }

    move(point){

        var center={lat:point[0],lng:point[1]};
        this.map.setCenter(center);

    }

    zoomIn(){

        var zoom = this.map.getZoom();

        zoom++;

        this.map.setZoom(zoom);
    }

    zoomOut(){

        var zoom = this.map.getZoom();

        zoom--;

        this.map.setZoom(zoom);

    }

    getMap(){

        return this.map;

    }

    setType(){

        

    }

}







