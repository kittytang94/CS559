function setup() {"use strict";
    var canvas = document.getElementById('tangCanvas');

    var slider = document.getElementById('slider');
    slider.value = 0;

    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var rngColor = slider.value;

        function drawStar(fColor, sColor) {
            context.lineWidth = 5;
            context.beginPath();
            context.fillStyle = fColor;
            context.strokeStyle = sColor;
            context.rect(50,50,50,50);
            context.closePath();
            context.fill();
            context.stroke();

        }

        function drawFox(fColor, sColor) {
            context.lineWidth = 5;
            context.fillStyle = fColor;
            context.strokeStyle = sColor;
            context.beginPath();
            context.rect(100,500,500,500);
            context.closePath();
            context.fill();
            context.stroke();

        }

        function getRandomInt (color) {
            return Math.floor(Math.random() * color);
        } //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        function rgb(r, g, b){
            return ["rgb(",r,",",g,",",b,")"].join("");
        } //https://stackoverflow.com/questions/2173229/how-do-i-write-a-rgb-color-value-in-javascript
        
        
        
        drawStar("yellow", "black");
        drawFox(rgb(getRandomInt(rngColor),getRandomInt(rngColor),getRandomInt(rngColor)), "black");
        
    }
    slider.addEventListener("input", draw);
    draw();
}

window.onload = setup;
