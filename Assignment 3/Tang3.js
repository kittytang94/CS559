function setup() {
    "use strict";
    var canvas = document.getElementById('Tang3');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    var Lfish = document.getElementById('slider1');
    var LandRfish = document.getElementById('slider2');
    var up = 0;

    Lfish.value = 0;
    LandRfish.value = 0;



    var fSchool = [
        [500, 250], [300, 300], [600, 100],
        [100, 200], [750, 400], [800, 200],
        [200, 50], [300, 175], [900, 450],
        [555, 355], [950, 280]
    ];

    // var bubbles = [
    //     [400, 500], [450, 450], [750, 500],
    //     [600, 475], [250, 455], [900, 425],
    //     [50, 465], [100, 450], [500, 500],
    //     [700, 450], [950, 475]
    // ];
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        up -= 1;

        var stack = [mat3.create()];
        function save() { stack.unshift(mat3.clone(stack[0])); }
        function restore() { stack.shift(); }

        function moveToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }
        function lineToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.lineTo(res[0], res[1]);
        }
        //draws ellipse
        function ellipseTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.ellipse(res[0], res[1], 20, 10, 0, 0, 2 * Math.PI);
        }
        //draws cirle
        function arcTx(rad, loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.arc(res[0], res[1], rad, 0, 2 * Math.PI);
        }
        //draw bubble
        function drawBubble(Tx) {
            context.strokeStyle = "white";
            moveToTx([0, 0], Tx);
            context.beginPath();
            arcTx(20, [0, 0], Tx);
            context.closePath();
            context.stroke();
            moveToTx([7, -9], Tx);
            context.beginPath();
            arcTx(2, [7, -9], Tx);
            context.closePath();
            context.stroke();
            moveToTx([10, -5], Tx);
            context.beginPath();
            arcTx(2, [10, -5], Tx);
            context.closePath();
            context.stroke();
        }

        //draws whole fish
        function drawFish(color, Tx) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = color;
            moveToTx([0, 0], Tx);
            ellipseTx([0, 0], Tx);
            moveToTx([20, 0], Tx);
            lineToTx([30, 10], Tx);
            lineToTx([35, -10], Tx);
            context.stroke();
            context.fill();
        }
        function flipFish(Tx) {
            mat3.scale(Tx, Tx, [-1, 1]);
        }


        //change y var to move up
        function animBubble(pos) {
            var bubble = mat3.create();
            mat3.fromTranslation(bubble, [pos[0], pos[1] + up]);
            drawBubble(bubble);
        }

        for (var i = 0; i < fSchool.length; i++) {
            if (fSchool[i][0] <= 500) {
                animLFish("blue", fSchool[i], true);
            } else
                animLRFish("red", fSchool[i]);

        }
        var bubbles = [];
        for (var i = 0; i < 20; i++) {
            bubbles[i] = mat3.create();
        }


        for (var i = 0; i < bubbles.length; i++) {
            animBubble(bubbles[i]);
        }
    }
    Lfish.addEventListener("input", draw);
    LandRfish.addEventListener("input", draw);
    setInterval(draw, 35)
}
window.onload = setup;

/* SOURCES
https://output.jsbin.com/fawudah
https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/
*/