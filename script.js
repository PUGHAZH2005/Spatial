// 1. Initialize the Map
const map = new mlgl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', // Clean dark map
    center: [78.9629, 20.5937], // India Center
    zoom: 4,
    pitch: 30,
    bearing: 0,
    interactive: false // Let the scroll do the work
});

// 2. Define your "Fly-To" locations
const locations = {
    'global': {
        center: [78.9629, 20.5937],
        zoom: 4,
        pitch: 0,
        bearing: 0
    },
    'education': {
        center: [77.2090, 28.6139], // Delhi example - Change to your Uni coords!
        zoom: 13,
        pitch: 60,
        bearing: -20
    },
    'project1': {
        center: [77.5946, 12.9716], // Bangalore example
        zoom: 14,
        pitch: 70,
        bearing: 40
    },
    'toolkit': {
        center: [78.9629, 20.5937],
        zoom: 5,
        pitch: 40,
        bearing: 0
    },
    'contact': {
        center: [72.8777, 19.0760], // Mumbai example
        zoom: 10,
        pitch: 0,
        bearing: 0
    }
};

// 3. Setup Scrollama
const scroller = scrollama();

scroller
    .setup({
        step: '.step',
        offset: 0.5, // Trigger when section is halfway up
    })
    .onStepEnter((response) => {
        // Add highlight class
        response.element.classList.add('is-active');
        
        // Get the location data for this step
        const name = response.element.getAttribute('data-location');
        const config = locations[name];

        // Move the map!
        map.flyTo({
            ...config,
            duration: 3000, // 3 seconds smooth transition
            essential: true
        });
    })
    .onStepExit((response) => {
        response.element.classList.remove('is-active');
    });

// Resize handler
window.addEventListener('resize', scroller.resize);
