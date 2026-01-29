mapboxgl.accessToken = 'pk.eyJ1Ijoib2Nhc3RpIiwiYSI6ImNtaGJlcHR0bzBkbHEyam9hZjUxdTN2em8ifQ.1dlbHGkcsfz7UDrymlleLA';

let map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 3,
    minZoom: 2,
    projection: 'albers',
    center: [-98, 38]
});

const grades = [1000, 10000, 100000],
      colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
      radii = [4, 8, 12];

map.on('load', () => {
    map.addSource('covid-counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.json'
    });

    map.addLayer({
        'id': 'covid-point',
        'type': 'circle',
        'source': 'covid-counts',
        'paint': {
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [{zoom: 3, value: grades[0]}, radii[0]],
                    [{zoom: 3, value: grades[1]}, radii[1]],
                    [{zoom: 3, value: grades[2]}, radii[2]]
                ]
            },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    });

    map.on('click', 'covid-point', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}<br>
                        <strong>County:</strong> ${event.features[0].properties.county}`)
            .addTo(map);
    });
});

const legend = document.getElementById('legend');
var labels = ['<strong>Cases</strong>'], vbreak;

for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    dot_radius = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p>');
}

const source = '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">NY Times</a></p>';
legend.innerHTML = labels.join('') + source;