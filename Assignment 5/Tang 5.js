function setup() {
    "use strict";
    var canvas = document.getElementById('Tang5');
    var cxt = canvas.getContext('2d');
    
    function draw() {
        context.clearRect(0,0, canvas.clientWidth, canvas.height);

    }
    draw();
}
window.onload = setup;