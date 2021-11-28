function setup() {
    "use strict";
    var canvas = document.getElementById('Tang3');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";
    
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var slider3 = document.getElementById('slider3');
    var slider4 = document.getElementById('slider4');

    slider1.value = 0;
    slider2.value = 0;
    slider3.value = 0;
    slider4.value = 0;

    var bubblesPos = [
        [400, 500], [450, 450], [750, 500],
        [600, 475], [250, 455], [900, 425],
        [50, 465], [100, 450], [500, 500],
        [700, 450], [950, 475]
    ];

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        var stack = [mat3.create()];
        function save() { stack.unshift(mat3.clone(stack[0])); }
        function restore() { stack.shift(); }

        function moveToTx(loc) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, stack[0]);
            context.moveTo(res[0], res[1]);
        }
        function lineToTx(loc) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, stack[0]);
            context.lineTo(res[0], res[1]);
        }
        //draws ellipse
        function ellipseTx(loc) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, stack[0]);
            context.ellipse(res[0], res[1], 20, 10, 0, 0, 2 * Math.PI);
        }
        //draws cirle
        function arcTx(rad, loc) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, stack[0]);
            context.arc(res[0], res[1], rad, 0, 2 * Math.PI);
        }
        //draw bubble
        function drawBubble() {
            context.strokeStyle = "white";
            moveToTx([0, 0]);
            context.beginPath();
            arcTx(20, [0, 0]);
            context.closePath();
            context.stroke();
            moveToTx([7, -9]);
            context.beginPath();
            arcTx(2, [7, -9]);
            context.closePath();
            context.stroke();
            moveToTx([10, -5]);
            context.beginPath();
            arcTx(2, [10, -5]);
            context.closePath();
            context.stroke();
        }

        //draws whole fish
        function drawFish(color) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = color;
            moveToTx([0, 0]);
            ellipseTx([0, 0]);
            moveToTx([20, 0]);
            lineToTx([30, 10]);
            lineToTx([35, -10]);
            context.stroke();
            context.fill();
        }
        function flipFish(fish) {
            mat3.scale(fish, fish, [-1,1]);
        }

        var oneFish = mat3.create();
        mat3.fromTranslation(oneFish, [250,250]);
        mat3.multiply(stack[0],stack[0],oneFish);
        drawFish("red");

        save();
        var twoFish = mat3.create();
        mat3.fromTranslation(twoFish, [50,50]);
        mat3.translate(twoFish, twoFish, [slider1.value, 0]);
        flipFish(twoFish);
        mat3.multiply(stack[0], stack[0], twoFish);
        drawFish("blue");

        save();
        var dumbFish = mat3.create();
        mat3.fromTranslation(dumbFish, [-200,-90]);
        mat3.translate(dumbFish,dumbFish, [slider2.value, 0]);
        mat3.multiply(stack[0],stack[0], dumbFish);
        drawFish("green");

        save();
        var littleFish = mat3.create();
        mat3.fromTranslation(littleFish, [-200,50]);
        mat3.translate(littleFish,littleFish, [slider3.value, 0]);
        mat3.multiply(stack[0],stack[0], littleFish);
        drawFish("purple");
        restore();
        restore();
        restore();

        save();
        var bubble = mat3.create();
        mat3.fromTranslation(bubble, [-50,50]);
        mat3.translate(bubble, bubble, [0, slider4.value]);
        mat3.multiply(stack[0], stack[0], bubble);
        drawBubble();
        restore();
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();
}
window.onload = setup;

/* SOURCES
https://output.jsbin.com/fawudah
https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/
*/