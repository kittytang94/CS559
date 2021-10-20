function setup() {
    "use strict";
    var canvas = document.getElementById('Tang3');
    var context = canvas.getContext('2d');

    var slider = document.getElementById('slider');
    slider.value = 0;

    canvas.style.background = "powderblue";
    var tParam = slider.value * 0.01;

    function draw() {
        context.clearRect(0, 0, context.canvas.width, canvas.height);

        function moveToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }
//adjust to make a curve instead of line (use either this or hermite curve)
        function lineToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.lineTo(res[0], res[1]);
        }

        var Hermite = function (t) {
            return [
                2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1,
                Math.pow(t, 3) - 2 * Math.pow(t, 2) + t,
                -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2),
                Math.pow(t, 3) - Math.pow(t, 2)
            ];
        }
//need to somehow understand this more
        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            //vec2.scaleAndAdd(result, result, P[3], b[3]);
            //vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }
//need to adjust points to be in line with a fish
        var p0 = [0, 0];
        var v0 = [2, 2];
        var p1 = [2, 2.5];
        var v1 = [1, 1];
        var p2 = [0, 0];
        var v2 = [1, 1];

        var P0 = [p0, v0, p1, v1]; // First two points and tangents
        var P1 = [p1, v1, p2, v2]; // Last two points and tangents

        var C0 = function (t_) { return Cubic(Hermite, P0, t_); };
        var C1 = function (t_) { return Cubic(Hermite, P1, t_); };
       // var C2 = function (t_) { return Cubic(Hermite, P2, t_); };

//need to change this to allow for window animation movement back and forth rather than slider
        var anim = function (t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else {
                var u = t - 1.0;
                return C1(u);
            }
        }
        
        //draws one line of the fish
        function drawPath(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.lineWidth = 3;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }
        //draws whole fish
        function drawFish(color) {
            var fish1 = mat3.create();
            mat3.fromTranslation(fish1, [500, 250]);
            drawPath(0, 2.5, 100, C0, fish1, "red");
            
            drawPath(10, 5, 100, C1, fish1, "blue");
        }



        drawFish();

        var isThisFish = mat3.create();
        mat3.fromTranslation(isThisFish, anim(tParam));
    }
    draw();
    //window.requestAnimationFrame(draw);
}
window.onload = setup;

/* SOURCES
https://output.jsbin.com/fawudah
https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/
*/