// the elements in the html that will recive latitude and logitude iss real time information
const realTimeLat = document.querySelector("#lat");
const realTimeLog = document.querySelector("#long");
const realTimeVel = document.querySelector("#velocity");
const realTimeStamp = document.querySelector("#time")
const realTimeAlt = document.querySelector("#altitude");
const realtTimeVisi = document.querySelector("#visibility");
const visibiltyData = document.querySelector("#dataVisibility");

// generated map from leaflet library
const mymap = L.map('mapid', {
    center: [0, 0],
    zoom: 3,
    scrollWheelZoom: false,
    touchZoom: true
    
});

// setting the satellite icon that goes mark the iss position on the map
let myIcon = L.icon({   
    iconUrl: 'img/iss.png',
    iconSize: [120, 90],
    iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

// setting an circle around the satellite icon
let circleAround = L.circle([0, 0], {radius: 1900001, color: 'white'}).addTo(mymap)

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
        
        const {latitude, longitude, velocity, timestamp, altitude, visibility} = data;

        // passing the coodernates to my map
        mymap.setView([latitude, longitude]);

        // passing the coordenates of my station to my map make a maker on it
        marker.setLatLng([latitude, longitude]);

        // padding the coordenates of my station to my circle around 
        circleAround.setLatLng([(latitude - 5), (longitude + 5)]);
        
        // converting the iss timestamp to human readable data
        let miliseconds = timestamp * 1000;
        const date = new Date(miliseconds);
        const humanFormat = date.toLocaleString();

        // applying the real time iss information in the html tags
        realTimeLat.textContent = latitude;
        realTimeLog.textContent = longitude;
        realTimeVel.textContent = `${velocity.toFixed(6)} Km`;
        realTimeStamp.textContent = humanFormat;
        realTimeAlt.textContent = `${altitude.toFixed(4)} metros`;
        realtTimeVisi.textContent = visibility;
        
        // change the table row visibility color according to the real visibility
        if (visibility == 'daylight') {
            visibiltyData.style.background = 'yellow';
        }
        else {
            visibiltyData.style.background = 'black';
            visibiltyData.style.color = 'white';
        }

    }, 1000);

