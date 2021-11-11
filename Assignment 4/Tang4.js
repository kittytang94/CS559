function setup() {
    "use strict"

    var canvas = document.getElementById('Tang4');
    var context = canvas.getContext('2d');
    canvas.style.background = "powderblue";

    var beeT = 0;

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        beeT +=0.01;
        if(beeT == 2) { beeT = 0;}

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
            moveToTx([0, 15], Tx);
            ellipseTx([0, 15], 75, Tx);
            moveToTx([0, 30], Tx);
            ellipseTx([0, 30], 90, Tx);
            moveToTx([0, 45], Tx);
            ellipseTx([0, 45], 100, Tx);
            moveToTx([0, 60], Tx);
            ellipseTx([0, 60], 110, Tx);
            moveToTx([0, 75], Tx);
            ellipseTx([0, 75], 110, Tx);
            moveToTx([0, 90], Tx);
            ellipseTx([0, 90], 110, Tx);
            moveToTx([0, 105], Tx);
            ellipseTx([0, 105], 110, Tx);
            moveToTx([0, 120], Tx);
            ellipseTx([0, 120], 110, Tx);
            moveToTx([0, 135], Tx);
            ellipseTx([0, 135], 110, Tx);
            moveToTx([0, 150], Tx);
            ellipseTx([0, 150], 110, Tx);
            moveToTx([0, 165], Tx);
            ellipseTx([0, 165], 100, Tx);
            moveToTx([0, 180], Tx);
            ellipseTx([0, 180], 90, Tx);
            moveToTx([0, 195], Tx);
            ellipseTx([0, 195], 75, Tx);
            moveToTx([0, 210], Tx);
            ellipseTx([0, 210], 60, Tx);

            context.stroke();
            context.fill();
            context.closePath();

        }
        function drawBee(Tx) {
            context.fillStyle = "yellow";
            context.strokeStyle = "black";
            context.setLineDash([]);
            context.lineWidth = 3;
            moveToTx([0, 0], Tx);
            context.beginPath();
            ellipseTx([0, 0], 13, Tx);
            moveToTx([0,-5],Tx);
            lineToTx([0,5], Tx);
            moveToTx([-7, 5], Tx);
            lineToTx([-7,-5], Tx);
            moveToTx([7, 5],Tx);
            lineToTx([7, -5], Tx);
            context.fill();
            context.stroke();
            context.closePath();
            context.fillStyle = "white";
            moveToTx([-1, -1], Tx);
            context.beginPath();
            ellipseTx([7, -10], 12, Tx, 3 * Math.PI / 4);
            context.fill();
        }
        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.beginPath();
            context.setLineDash([10, 10]);
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }

        function bezier(cp1x, cp1y, cp2x, cp2y, loc,Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, res[0], res[1]);
        }

	    var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	    }

        function Cubic(basis,P,t){
            var b = basis(t);
            var result=vec2.create();
            vec2.scale(result,P[0],b[0]);
            vec2.scaleAndAdd(result,result,P[1],b[1]);
            vec2.scaleAndAdd(result,result,P[2],b[2]);
            vec2.scaleAndAdd(result,result,P[3],b[3]);
            return result;
        }

        var p0=[-50,50]; var d0=[-50,-30];
        var p1=[-1,-1]; var d1=[5,-3];
        var p2=p1; var d2=[-51,20];
        var p3=p2; var d3=[5,5];

        var P0 = [p0,d0,p1,d1]; // First two points and tangents
        var P1 = [p1,d1,p2,d2]; // Last two points and tangents
        var P2 = [p2,d2,p3,d3];

    
        var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
        var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
        var C2 = function(t_) {return Cubic(Hermite, P2, t_)};

        var Ccomp = function(t) {
            if (t<1){
                var u = t;
                return C0(u);
            } else if (t<2){
                var u = t-1.0;
                return C1(u);
            } else {
                var u = t-2.0;
                return C2(u);
            }          
        }

        var hive = mat3.create();
        mat3.fromTranslation(hive, [250, 50]);
        drawHive(hive);

        var path = mat3.create();
        mat3.fromTranslation(path, [250,250]);
        mat3.scale(path, path, [1,-1]);


        drawTrajectory(0.0,1.0, 100, C0, path, "red");
        drawTrajectory(1.0, 2.0, 100, C1, path, "blue");
        drawTrajectory(2.0,3.0,100, C2, path, "purple");

        var what = mat3.create();
        mat3.fromTranslation(what, Ccomp(beeT));
        var bee = mat3.create();
        mat3.multiply(bee, path, what);
        mat3.fromTranslation(bee, [250, 300]);
        drawBee(bee);
    }

    setInterval(draw, 25);
}
window.onload = setup;