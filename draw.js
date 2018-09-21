class Route{

    //constructs new path with new polyline
    constructor(map,path){

        this.pathCoordinates=[];

        for(var i=0; i<path.length; i++){

            var coordinate={lat:path[i][0],lng:path[i][1]}
            this.pathCoordinates.push(coordinate);

        }

        this.route = new google.maps.Polyline({

            path: this.pathCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2

        });

        this.route.setMap(map);

    }

    // set path from 0 without re-construct
    setPath(path){

        for(var i=0; i<path.length; i++){

            var coordinate={lat:path[i][0],lng:path[i][1]}
            this.pathCoordinates.push(coordinate);
            this.route.setPath(this.pathCoordinates);

        }

    }

    // adds new point at the end of the path and actualizes polyline
    addPoint(point){

        var coordinate={lat:point[0],lng:point[1]}
        this.pathCoordinates.push(coordinate);
        this.route.setPath(this.pathCoordinates);

    }

}