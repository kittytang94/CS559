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
        function ellipseTx(loc, Tx ) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.ellipse(res[0], res[1], 20, 10, 0, 0, 2 * Math.PI);
        }

        //draws cirle
        function arcTx(rad, loc, Tx) {
        var res = vec2.create();
        vec2.transformMat3(res, loc, Tx);
        context.arc(res[0], res[1], rad, 0, 2*Math.PI);
        }

        //draw bubble
        function drawBubble(Tx) {
            context.strokeStyle = "white"
            moveToTx([0,0], Tx);
            context.beginPath();
            arcTx(20, [0,0], Tx);
            context.closePath();
            context.stroke();
            moveToTx([7,-9], Tx);
            context.beginPath();
            arcTx(2, [7,-9], Tx);
            context.closePath();
            context.stroke();
            moveToTx([10,-5], Tx);
            context.beginPath();
            arcTx(2, [10,-5], Tx);
            context.closePath();
            context.stroke();
        }

        //draws whole fish
        function drawFish(color,Tx) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = color;
            moveToTx([0,0],Tx);
            ellipseTx([0,0], Tx);
            moveToTx([20,0], Tx);
            lineToTx([30,10], Tx);
            lineToTx([35,-10],Tx);
            context.stroke();
            context.fill();

        }
        var fish1 = mat3.create();
        mat3.fromTranslation(fish1, [500, 250]);
        drawFish("blue", fish1);
        var bubble = mat3.create();
        mat3.fromTranslation(bubble, [100, 100]);
        drawBubble(bubble);
    }
    window.requestAnimationFrame(draw);
}
window.onload = setup;

/* SOURCES
https://output.jsbin.com/fawudah
https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/
*/