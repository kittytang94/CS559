function setup() {
    "use strict"

    var canvas = document.getElementById('Tang4');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

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
        function ellipseTx(loc, xRad, Tx, rot) {
            var rotation = 0;
            if (rot != null) {
                rotation = rot;
            }
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.ellipse(res[0], res[1], xRad, 5, rotation, 0, 2 * Math.PI);
        }

        function drawHive(Tx) {
            context.lineWidth = 10;
            context.fillStyle = "gold";
            context.strokeStyle = "goldenrod";
            moveToTx([0, 0], Tx);
            context.beginPath();
            ellipseTx([0, 0], 60, Tx);
            moveToTx([0, 15], Tx); ellipseTx([0, 15], 75, Tx);
            moveToTx([0, 30], Tx); ellipseTx([0, 30], 90, Tx);
            moveToTx([0, 45], Tx); ellipseTx([0, 45], 100, Tx);
            moveToTx([0, 60], Tx); ellipseTx([0, 60], 110, Tx);
            moveToTx([0, 75], Tx); ellipseTx([0, 75], 110, Tx);
            moveToTx([0, 90], Tx); ellipseTx([0, 90], 110, Tx);
            moveToTx([0, 105], Tx); ellipseTx([0, 105], 110, Tx);
            moveToTx([0, 120], Tx); ellipseTx([0, 120], 110, Tx);
            moveToTx([0, 135], Tx); ellipseTx([0, 135], 110, Tx);
            moveToTx([0, 150], Tx); ellipseTx([0, 150], 110, Tx);
            moveToTx([0, 165], Tx); ellipseTx([0, 165], 100, Tx);
            moveToTx([0, 180], Tx); ellipseTx([0, 180], 90, Tx);
            moveToTx([0, 195], Tx); ellipseTx([0, 195], 75, Tx);
            moveToTx([0, 210], Tx); ellipseTx([0, 210], 60, Tx);
            context.stroke(); context.fill(); context.closePath();

        }

        function drawBee(Tx) {
            context.fillStyle = "yellow";
            context.strokeStyle = "black";
            context.lineWidth = 3;
            moveToTx([0, 0], Tx);
            context.beginPath();
            ellipseTx([0, 0], 13, Tx);
            moveToTx([0, -5], Tx); lineToTx([0, 5], Tx);
            moveToTx([-7, 5], Tx); lineToTx([-7, -5], Tx);
            moveToTx([7, 5], Tx); lineToTx([7, -5], Tx);
            context.fill(); context.stroke(); context.closePath();
            context.fillStyle = "white";
            moveToTx([-1, -1], Tx);
            context.beginPath();
            ellipseTx([7, -10], 12, Tx, 3 * Math.PI / 4);
            context.fill();
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }

        var hive = mat3.create();
        mat3.fromTranslation(hive, [250, 50]);
        drawHive(hive);
        var bee = mat3.create();
        mat3.fromTranslation(bee, [250, 300]);
        drawBee(bee);
    }

    draw();
}
window.onload = setup;