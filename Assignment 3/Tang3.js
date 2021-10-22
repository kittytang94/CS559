function setup() {
    "use strict";
    var canvas = document.getElementById('Tang3');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    function draw() {
        context.clearRect(0, 0, context.canvas.width, canvas.height);
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
        function moveUp() {

        }

        //change y var to move up
        function animBubble(pos) {
            var bubble = mat3.create();
            mat3.fromTranslation(bubble, pos);
            drawBubble(bubble);
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
        function moveLeft(fish) {
            var trans = vec2.create();
        }
        function moveRight() {
            var trans = vec2.create();

        }
        //TODO: change x var to move left/right flipping fish as it changes direction
        function animFish(color, pos, dir) {
            var fish1 = mat3.create();
            mat3.fromTranslation(fish1, pos);
            //if fish hits side of tank then switch direction
            if (pos[0] == 0 || pos[0] == canvas.width) {
                dir = !dir;
            }
            if (dir == true) {
                mat3.scale(fish1, fish1, [-1, 1]);
                vec2 translate = vec2()
            } else {
                mat3.scale(fish1, fish1, [1, 1]);
            }
            drawFish(color, fish1);
        }

        var fSchool = [
          [500, 250],[300, 300], [600, 100], 
          [100, 200], [750, 400], [800, 200],
          [200, 50], [300, 175], [900, 450],
          [555, 355], [950, 280]
        ];
        for (var i = 0; i < fSchool.length; i++) {
            if (fSchool[i][0] <= 500) {
                animFish("blue", fSchool[i], true);
            } else 
            animFish("red", fSchool[i]);
        }
        var bubbles = [
            [400, 500], [450, 450], [750, 500],
            [600,475], [250,455], [900, 425],
            [50, 465]
        ];
        for (var i = 0; i < bubbles.length; i++) {
            animBubble(bubbles[i]);
        }
    }
    window.requestAnimationFrame(draw);
}
window.onload = setup;

/* SOURCES
https://output.jsbin.com/fawudah
https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/
*/