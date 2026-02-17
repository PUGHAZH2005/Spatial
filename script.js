// Ensure the script runs after the page loads
window.addEventListener('load', function() {

    // 1. Initialize Map
    const map = new maplibregl.Map({
        container: 'map',
        // Using a highly reliable OpenStreetMap-based dark style
        style: 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [78.9629, 20.5937], 
        zoom: 4,
        pitch: 40,
        bearing: 0,
        interactive: false
    });

    // 2. Locations Dictionary
    const locations = {
        'india': { center: [78.9629, 20.5937], zoom: 4, pitch: 0, bearing: 0 },
        'edu_chennai': { center: [80.2354, 13.0131], zoom: 14, pitch: 60, bearing: 30 },
        'brazil': { center: [-48.4764, -1.4558], zoom: 12, pitch: 50, bearing: -20 },
        'coimbatore': { center: [76.9660, 11.0168], zoom: 13, pitch: 70, bearing: 10 },
        'nilgiris': { center: [76.7337, 11.4916], zoom: 11, pitch: 65, bearing: -30 }
    };

    // 3. Initialize Scrollama
    const scroller = scrollama();

    map.on('load', function () {
        console.log("Map is loaded successfully!");
        
        scroller
            .setup({
                step: '.step',
                offset: 0.5,
            })
            .onStepEnter((response) => {
                response.element.classList.add('is-active');
                const name = response.element.getAttribute('data-location');
                const config = locations[name];

                if (config) {
                    map.flyTo({
                        ...config,
                        duration: 3000,
                        essential: true
                    });
                }
            })
            .onStepExit((response) => {
                response.element.classList.remove('is-active');
            });
    });

    // Resize handler
    window.addEventListener('resize', scroller.resize);
});
