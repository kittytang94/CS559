function setup() {
    "use strict";
    //canvas variables
    var canvas = document.getElementById('assignment2');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    var xPos = Math.random() * ((canvas.width - 50) - 50) + 50;
    var sX = Math.random() * (1.5 - 1) + 1;
    var sY = Math.random() * (1.5 - 1) + 1;

    function draw() {
        setTimeout(draw, 100);
        context.clearRect(0, 0, canvas.width, canvas.height);
        //draws white circle
        function drawCloudpart() {
            context.fillStyle = 'white';
            var rad = Math.random() * 20 + 10;
            context.beginPath();
            context.arc(0, 0, rad, 0, 2 * Math.PI);
            context.fill();
            context.scale(sX, sY);
        }
        //picks random coordinate and creates a clump of circles to form cloud
        function drawCloud() {
            context.save();
            for (var x = 0; x < 10; x++) {
                context.save();
                var r = Math.PI / 180 * (72 * x);
                drawCloudpart();
                context.translate(25 * Math.cos(r), 10 * Math.sin(r));
                drawCloudpart();
                context.restore();
            }
            context.restore();
        }
        //draws multiple clouds on canvas

        context.save();
        context.translate(100, Math.random() * 10 + 50);
        drawCloud(); context.translate(250, 0);
        drawCloud(); context.translate(-90, 75);
        drawCloud(); context.translate(150, 75);
        drawCloud(); context.translate(-250, 75);
        drawCloud(); context.translate(150, 75);
        drawCloud(); context.translate(-150, 75);
        drawCloud(); context.translate(250, 0);
        drawCloud(); context.restore();
        //moves clouds left or right depending on xPos value
        if (xPos > canvas.width / 2) {
            context.translate(-1, 0);context.restore();
        } else {
            context.translate(1, 0);context.restore();
        }
        context.restore();

    } draw();
} window.onload = setup;

/* SOURCES
 https://p5js.org/learn/curves.html - continuous spline curves
 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

*/