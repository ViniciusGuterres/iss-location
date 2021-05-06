// the elements in the html that will recive latitude and logitude iss real time information
const sectionLat = document.querySelector(".latitude span");
const sectionLong = document.querySelector(".longitude span");

// generated map from leaflet library
const mymap = L.map('mapid', {
    center: [0, 0],
    zoom: 3
});

// setting the satellite icon that goes mark the iss position on the map
let myIcon = L.icon({   
    iconUrl: 'iss.png',
    iconSize: [120, 90],
    iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

// setting an circle around the satellite icon
let circleAround = L.circle([0, 0], {radius: 1900001, color: 'red'}).addTo(mymap)

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

        // passing the coodernates to my map
        mymap.setView([latitude, longitude]);

        // passing the coordenates of my station to my map make a maker on it
        marker.setLatLng([latitude, longitude]);

        // padding the coordenates of my station to my circle around 
        circleAround.setLatLng([(latitude - 5), (longitude + 5)]);
        

        sectionLat.textContent = latitude;

        sectionLong.textContent = longitude;

    }, 1000);

