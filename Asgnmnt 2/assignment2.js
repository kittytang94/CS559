function setup() {
    "use strict";
    //canvas variables
    var canvas = document.getElementById('assignment2');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    requestAnimationFrame(draw);


    //Path that the wing joints move along
    function wingRPath() {
        context.beginPath();
        context.arc(250, 250, 100, Math.PI / 3, 5 * Math.PI / 3, true);
        context.closePath();
        context.stroke();
    }

    function wingLPath() {
        context.beginPath();
        context.arc(250, 250, 100, 2 * Math.PI / 3, 4 * Math.PI / 3);
        context.closePath();
        context.stroke();
    }
    var xPos = Math.random() * canvas.width;
    var yPos = Math.random() * canvas.height;
    var sX = Math.random() * (1.5 - 1) + 1;
    var sY = Math.random() * (1.5 - 1) + 1 ;

    function draw() {

        //draws white circle
        function drawCloudpart() {
            context.fillStyle = 'white';
            var rad = Math.random() * 20;
            context.beginPath();
            context.arc(0, 0, rad, 0, 2 * Math.PI);
            context.fill();
        }
        //picks random coordinate and creates a clump of circles to form cloud

        function drawCloud() {
            context.translate(xPos, yPos);
            context.scale(sX, sY);
            context.save();
            for (var x = 0; x < 100; x++) {
                var r = Math.PI / 180 * (72 * x);
                context.translate(25 * Math.cos(r), 10 * Math.sin(r));
                drawCloudpart();
            }
            context.restore();

        }

        //draws bird parts
        function drawBird() {
            context.lineWidth = 5;
            context.strokeStyle = "black";
            context.moveTo(0, 0);
            context.lineTo(-25, -25);
            //context.arc(250, 250, radius, 7*Math.PI/4, 0);
            context.closePath();
            context.stroke();
        }

        //draws on canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        for (var i = 0; i <= 50; i++) {
            drawCloud();

            //context.scale(Math.random * 100, Math.random * 5);
        }

        if (yPos % 2 == 1) {
            context.translate(1, 0);
        }
        else
            context.translate(-1, 0);

        context.restore();
        //setTimeout(draw, 100);
        window.requestAnimationFrame(draw);
    }
    draw();
}

window.onload = setup;

/* SOURCES
 https://p5js.org/learn/curves.html - continuous spline curves
 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

*/