function setup() {
    "use strict";
    var canvas = document.getElementById('Tang5');
    var context = canvas.getContext('2d');

    function draw() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.height);
        var tParam = slider1.value * 0.01;
        var viewAngle = slider2.value * 0.02 * Math.PI;

        var CameraCurve = function (angle) {
            var distance = 120.0;
            var eye = vec3.create();
            eye[0] = distance * Math.sin(viewAngle);
            eye[1] = 100;
            eye[2] = distance * Math.cos(viewAngle);
            return [eye[0], eye[1], eye[2]];
        }

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

    }
    draw();
}
window.onload = setup;