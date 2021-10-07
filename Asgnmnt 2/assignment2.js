function setup() {
    "use strict";
    //canvas variables
    var canvas = document.getElementById('assignment2');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    //creates curve using transforms
    function curveVertexTx(loc, Tx) {
        var res = vec2.create();
        vec2.transformMat3(res, loc, Tx);
        context.curveVertex(res[0], res[1]);
    }

    //move to a point using transforms
    function moveToTx(loc, Tx) {
        var res = vec2.create();
        vec2.transformMat3(res, loc, Tx);
        context.moveTo(res[0], res[1]);
    }


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




    function draw() {

        //draws white circle
        function drawCloudpart() {
            context.fillStyle = 'white';
            context.beginPath();
            context.arc(0, 0, 20, 0, 2 * Math.PI);
            context.fill();
        }
        //picks random coordinate and creates a clump of circles to form cloud
        function drawCloud() {
            context.translate(Math.random() * canvas.width / 2, Math.random() * canvas.height / 2);
            context.save();
            for (var x = 0; x < 5; x++) {
                var r = Math.PI / 180 * (72 * x);
                context.translate(25 * Math.cos(r), 10 * Math.sin(r));
                drawCloudpart();
            }
            context.restore();
        }

        //draws bird parts
        function drawBird(radius) {
            context.lineWidth = 5;
            context.strokeStyle = "black";
            context.moveTo(0, 0);
            context.lineTo(-25, -25);
            //context.arc(250, 250, radius, 7*Math.PI/4, 0);
            context.closePath();
            context.stroke();
        }



        //draws on canvas
        context.save();

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
                wingRPath();
        wingLPath();
        for (var i = 0; i <= 50; i++) {
            context.scale(Math.random * 5, Math.random * 5);
            drawCloud();
            context.restore();
        }        
        context.translate(250, 250);
        drawBird();
        context.translate(-25, -25);
        context.scale(2.25, 1);
        context.rotate(300 * Math.PI / 180);
        drawBird();

        context.restore();
        context.save();


        window.requestAnimationFrame(draw);
    }
    draw();
}

window.onload = setup;

/* SOURCES
 https://p5js.org/learn/curves.html - continuous spline curves
 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

*/