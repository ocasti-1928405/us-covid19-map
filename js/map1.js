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
                data: 'assets/us-covid-2020-rates.geojson'
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
        });
