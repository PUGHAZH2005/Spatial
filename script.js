const map = new mlgl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [78.9629, 20.5937], 
    zoom: 4,
    pitch: 45,
    bearing: 0,
    interactive: false
});

const locations = {
    'india': {
        center: [78.9629, 20.5937],
        zoom: 4,
        pitch: 0,
        bearing: 0
    },
    'edu_chennai': {
        center: [80.2354, 13.0131], // Anna University, CEG
        zoom: 14,
        pitch: 60,
        bearing: 30
    },
    'brazil': {
        center: [-48.4764, -1.4558], // Federal University of Pará
        zoom: 12,
        pitch: 50,
        bearing: -20
    },
    'coimbatore': {
        center: [76.9660, 11.0168], // Coimbatore
        zoom: 13,
        pitch: 70,
        bearing: 10
    },
    'nilgiris': {
        center: [76.7337, 11.4916], // Nilgiris
        zoom: 11,
        pitch: 65,
        bearing: -30
    }
};

const scroller = scrollama();

scroller
    .setup({
        step: '.step',
        offset: 0.5,
    })
    .onStepEnter((response) => {
        response.element.classList.add('is-active');
        const name = response.element.getAttribute('data-location');
        const config = locations[name];

        map.flyTo({
            ...config,
            duration: 4000, // Slightly slower, more professional transition
            essential: true
        });
    })
    .onStepExit((response) => {
        response.element.classList.remove('is-active');
    });

window.addEventListener('resize', scroller.resize);
