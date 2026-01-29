 mapboxgl.accessToken = 'pk.eyJ1Ijoib2Nhc3RpIiwiYSI6ImNtaGJlcHR0bzBkbHEyam9hZjUxdTN2em8ifQ.1dlbHGkcsfz7UDrymlleLA';

        let map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 3, 
            projection: 'albers', // Albers projection
            minZoom: 2, 
            center: [-98, 38] // starting center
        });

        map.on('load', () => {
            map.addSource('covid-rates', {
                type: 'geojson',
                data: 'assets/us-covid-2020-rates.json'

            });

            map.addLayer({
                'id': 'covid-rates-layer',
                'type': 'fill',
                'source': 'covid-rates',
                'paint': {

                    'fill-color': [
                        'step',
                        ['get', 'rates'], 
                        '#FFEDA0',   
                        10,          
                        '#FED976',   
                        20,          
                        '#FEB24C',   
                        50,          
                        '#FD8D3C',   
                        100,         
                        '#FC4E2A',   
                        200,         
                        '#E31A1C',   
                        500,         
                        '#BD0026',   
                        1000,        
                        '#800026'    
                    ],
                    'fill-outline-color': '#BBBBBB',
                    'fill-opacity': 0.7,
                }
            });

        
const layers = [
    '0-9',
    '10-19',
    '20-49',
    '50-99',
    '100-199',
    '200-499',
    '500-999',
    '1000+'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70',
    '#BD002670',
    '#80002670'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Traffic Rate<br>(per 1k)</b><br><br>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;
    key.style.display = 'inline-block';
    key.style.width = '10px';
    key.style.height = '10px';
    key.style.marginRight = '5px';

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

const source = document.createElement('div');
source.style.textAlign = 'right';
source.style.fontSize = '10pt';
source.style.marginTop = '10px';
source.innerHTML = 'Source: <a href="https://github.com/nytimes/covid-19-data">NY Times</a>';
legend.appendChild(source);
        });
