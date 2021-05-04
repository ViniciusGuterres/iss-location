// the elements in the html that will recive latitude and logitude iss real time information
const sectionLat = document.querySelector(".latitude span");
const sectionLong = document.querySelector(".longitude span");

// generated map from leaflet library
const mymap = L.map('mapid', {
    center: [0, 0],
    zoom: 3
});

// setting the satellite icon that goes mark the iss position on the map
var myIcon = L.icon({   
    iconUrl: 'iss.png',
    iconSize: [100, 100],
    iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

// setting the map tiles from Open Streetmap
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tiles = L.tileLayer(tileUrl, {attribution} );

tiles.addTo(mymap);


// getting the coordinates from ISS api and update it every 1 second
setInterval(
    async function get() {

        const requestUrl = "https://api.wheretheiss.at/v1/satellites/25544";

        const response = await fetch(requestUrl);

        const data = await response.json(); 
        
        const {latitude, longitude} = data;

        mymap.setView([latitude, longitude]);

        // passing the coordenates of my station to my map make a maker on it
        marker.setLatLng([latitude, longitude]);       

        sectionLat.textContent = latitude;

        sectionLong.textContent = longitude;

        return latitude, longitude;

    }, 1000);

