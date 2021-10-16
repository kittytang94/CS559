function setup() {
    "use strict";
    var canvas = document.getElementById('Tang3');
    var context = canvas.getContext('2d');

    canvas.style.background = "powderblue";

    function draw() {
        context.clearRect(0,0, context.canvas.width, canvas.height);

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

        function drawFish() {
            context.lineWidth = 1;
            context.strokeStyle = "black";



        }
    }
    window.requestAnimationFrame(draw);
}
window.onload = setup;

/* SOURCES

https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/
*/