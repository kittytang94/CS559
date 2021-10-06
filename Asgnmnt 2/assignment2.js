function setup() { "use strict";
    //canvas variables
    var canvas = document.getElementById('assignment2');
    var context = canvas.getContext('2d');

    //animation loop
    // function draw() {
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     context.save();
    //     theCopters.forEach(function(c) { c.update();})
    //     theCopters.forEach(function(c) { c.draw(); })
    //     context.restore();
    //     window.requestAnimationFrame(draw);
    // }
    //creates curve using transforms
    function curveVertexTx(loc, Tx) {
        var res = vec2.create();
        vec2.transformMat3(res,loc,Tx);
        context.curveVertex(res[0],res[1]);
    }

    //move to a point using transforms
    function moveToTx(loc,Tx) {
        var res = vec2.create();
        vec2.transformMat3(res,loc,Tx);
        context.moveTo(res[0],res[1]);
    }

    //Path that the wing joints move along
    function wingRPath() {
        context.beginPath();
        context.arc(250,250, 100, Math.PI/3, 5 * Math.PI/3, true);
        context.closePath();
        context.stroke();
    }

    function wingLPath() {
        context.beginPath();
        context.arc(250,250, 100, 2*Math.PI/3, 4 * Math.PI/3);
        context.closePath();
        context.stroke();
    }
    
    //draws body of bird
    function drawBody() {
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.beginPath();
        //context.moveTo(300,250);
        context.arc(200, 250, 50, 7*Math.PI/4, 0);
        context.arc(300,250,50,5* Math.PI/4, Math.PI, true);
        context.closePath();
        context.stroke();
    }

    //draws wings of bird with transforms
    function drawWings(color, Tx) {
        context.moveTo(250,200);
        context.beginShape();
        curveVertexTx(400, 200, Tx);
        context.stroke();
    }
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBody();
    wingRPath();
    wingLPath();
    drawWings();
}
draw();
}

window.onload = setup;

/* SOURCES
 https://p5js.org/learn/curves.html - continuous spline curves
 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

*/