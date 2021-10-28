function setup() {
    "use strict"

    var canvas = document.getElementById('Tang4');
    var context = canvas.getContext('2d');

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);


    }

    draw();
}
window.onload(setup);