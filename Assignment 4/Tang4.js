function setup() {
    "use strict"

    var canvas = document.getElementById('Tang4');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    console.log("hi");
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        //draws ellipse
        function ellipseTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.ellipse(res[0], res[1], 20, 10, 0, 0, 2 * Math.PI);
        }
        context.fillStyle = "gold";
        context.strokeStyle = "goldenrod";

        context.moveTo(250, 250);
        context.beginPath();
        context.arcTo(150, 250, 350, 250, 0, 2 * Math.PI);
        context.fill();
        console.log("hello");

        function drawBee() {

        }

    }

    draw();
}

window.onload = setup;