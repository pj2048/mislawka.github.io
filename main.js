let debug = true;

const colors = [
    '#FF0000', // Red
    '#FE6E00', // Orange
    '#00D000', // Green
    '#326CC9', // Blue
    '#E042F5', // Purple
];
//[, 0], // 

const dots = [
    // Red dots
    [28.74, 21.92, 0], // Journey Canada, Otlawa
    [25.77, 36.11, 0], // Cuba
    [22.92, 37.45, 0], // Mexico
    [23.16, 41.52, 0], // Nicaragua
    [23.95, 43.53, 0], // Costarica
    [29.27, 61.97, 0], // Bolivia
    [28.40, 63.68, 0], // Chile, Atacama
    [28.72, 70.74, 0], // Chile, Santiago
    [44.05, 10.31, 0], // Iceland
    [46.93, 17.82, 0], // Wales
    [53.52, 19.24, 0], // Ukraine
    [45.60, 17.52, 0], // Ireland
    [53.23, 15.68, 0], // Latvia, Riga
    [44.82, 30.86, 0], // Morocco
    [52.30, 70.89, 0], // RPA, Cape Town
    [55.41, 68.59, 0], // RPA, Durban
    [54.63, 65.98, 0], // RPA, Pretoria
    [54.63, 26.41, 0], // Turkey
    [52.74, 22.69, 0], // Serbia
    [51.86, 22.02, 0], // Croatia
    [51.93, 23.23, 0], // Bosnia And Herzegovina
    [52.40, 23.76, 0], // Montenegro
    [52.74, 24.70, 0], // Albania
    [68.08, 32.15, 0], // India, New Dheli
    [70.23, 32.68, 0], // Nepal, Kathmandu
    [78.05, 35.62, 0], // Hong Kong
    [79.14, 46.81, 0], // Malaysia, Borneo
    [75.33, 46.35, 0], // Malaysia
    [76.03, 49.11, 0], // Singapore
    [79.14, 46.81, 0], // Thailand, Bangkok
    [75.72, 41.90, 0], // Cambodia
    [76.42, 43.59, 0], // Vietnam
    [74.71, 40.98, 0], // Thailand
    [76.88, 54.27, 0], // Indonesia
    [55.74, 31.34, 0], // Egypt
    [51.44, 14.14, 1], // Karlskrona
    [51.28, 16.03, 1], // Bornholm
    [51.05, 17.77, 1], // Nysa-Odra
    [53.36, 16.60, 1], // Gdansk - Vilnius
    [45.37, 23.96, 1], // Portugal
    [45.91, 27.33, 1], // Spain
    [47.78, 23.54, 2], // Pyrenees
    [51.28, 24.72, 2], // Italy 2001
    [49.94, 21.83, 2], // Italy 2002
    [51.28, 22.72, 3], // Cruise Croatia
    [52.84, 26.26, 3], // Cruise Greece
    [84.45, 75.80, 4], // Tasmania
    [83.33, 67.26, 4] // Australia
];

dots.forEach(dot => {
	$('#map').append(`<div class="dot" data-color="${colors[dot[2]]}"></div>`);
});

// Position the dots dynamically based on the dots array
dots.forEach((dot, index) => {
    const $dot = $('.dot').eq(index);
    $dot.css({
        'left': dot[0] + '%',
        'top': dot[1] + '%'
    });
});

// Click event to get the coordinates relative to the container
$(document).on('click', function(e) {
    if (debug) {
        const mapOffset = $('#map').offset();
        const mapWidth = $('#map').eq(0).width();
        const mapHeight = parseInt($('#map').eq(0).css('padding-top').slice(0, -2));

        if (mapHeight > 0 && mapWidth > 0) {  // Ensure map dimensions are valid
            const xPercent = Math.round((e.pageX - mapOffset.left) / mapWidth * 10000) / 100;
            const yPercent = Math.round((e.pageY - mapOffset.top) / mapHeight * 10000) / 100;

            console.log(/*`Clicked at: X = ${xPercent}% | Y = ${yPercent}% */`(${xPercent}, ${yPercent})`);
        } else {
            console.warn('Map height or width is zero, unable to calculate percentage (w: ' + mapWidth + ', h: ' + mapHeight + ').');
        }
    }
});


let lit = true;

// Main function to toggle dot colors
function main() {
    $('.dot').each(function() {
        const newColor = lit ? $(this).attr('data-color') : '#303030';
        $(this).css('background', newColor);
    });
    
    lit = !lit;

    /* Was meant to scale dots along with the website scale,
    so they are the same size on different zoom
    levels, but didn't work.

    let initialSize = 6;
    let scaleFactor = 1 / window.devicePixelRatio;
    $('.dot').each(() => {
        $(this).css({
            width: `${initialSize * scaleFactor}px`,
            height: `${initialSize * scaleFactor}px`
        })
    });
    */

    setTimeout(() => {
        $('.dot').each(function() {
            const newColor = lit ? $(this).attr('data-color') : '#303030';
            $(this).css('background', newColor);
        });

        lit = !lit

        setTimeout(main, 200); // Unlit for 200ms
    }, 500); // Lit for 500ms
}

// Start the color toggling when the page loads
$(document).ready(function() {
    main();
});

$(window).on('resize', () => {
    let scaleFactor = 1 / window.devicePixelRatio;
    dots.each(() => {
        $(this).css({
            width: `${initialSize * scaleFactor}px`,
            height: `${initialSize * scaleFactor}px`
        })
    });
});
