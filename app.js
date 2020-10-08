const canvas = document.querySelector("canvas");


// give the canvas the full height and width of the viewport

canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(canvas)

const canvasContext = canvas.getContext('2d');


class Player { 
    constructor(x,y,radius,color) { 
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
    }

    draw() { 
        canvasContext.beginPath();
        canvasContext.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
        canvasContext.fillStyle = this._color;
        canvasContext.fill();
    }
}

// make the payer center
const centerY = canvas.height / 2;
const centerX = canvas.width / 2;



const player = new Player(centerX, centerY, 30, "#737373");
player.draw();
console.log(player);