const test = get();

// generated map from leaflet library
const mymap = L.map('mapid', {
    center: [test.latitude, test.longitude],
    zoom: 5
});

var myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});


// const marker = L.marker([0, 0]).addTo(mymap);

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tiles = L.tileLayer(tileUrl, {attribution} );

tiles.addTo(mymap);


setInterval(
    async function get() {

        const sectionLat = document.querySelector(".latitude span");
        const sectionLong = document.querySelector(".longitude span");

        const requestUrl = "https://api.wheretheiss.at/v1/satellites/25544";

        const response = await fetch(requestUrl);

        const data = await response.json();
        
        const {latitude, longitude} = data;

        // passing the coordenates of my station to my map make a maker on it
        // marker.setLatLng([latitude, longitude]);
        L.marker([latitude, longitude]).addTo(mymap)
        mymap.center = [latitude, longitude];


        sectionLat.textContent = latitude;

        sectionLong.textContent = longitude;

        return latitude, longitude;

    }, 1000);

