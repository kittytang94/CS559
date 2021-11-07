function setup() {
    "use strict"

    var canvas = document.getElementById('Tang4');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    console.log("hi");
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        function moveToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }
        //draws ellipse
        function ellipseTx(loc, xRad, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.ellipse(res[0], res[1], xRad, 5, 0, 0, 2 * Math.PI);
        }


        function drawHive(Tx) {
        context.lineWidth = 10;
        context.fillStyle = "gold";
        context.strokeStyle = "goldenrod";
        moveToTx([0,0],Tx);
        context.beginPath();
        ellipseTx([0,0], 60,Tx);
        moveToTx([0,15],Tx);
        ellipseTx([0,15],75,Tx);
        moveToTx([0,30], Tx);
        ellipseTx([0,30], 90, Tx);
        moveToTx([0,45], Tx);
        ellipseTx([0,45], 100, Tx);
        moveToTx([0,60], Tx);
        ellipseTx([0,60], 110, Tx);

        context.stroke();
        context.fill();

        }
        
        
        context.arcTo(150, 250, 350, 250, 0, 2 * Math.PI);
        context.fill();
        console.log("hello");

        function drawBee() {

        }

        var hive = mat3.create();
        mat3.fromTranslation(hive, [250,50]);
        drawHive(hive);

    }

    draw();
}
window.onload = setup;