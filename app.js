const canvas = document.querySelector("canvas");


// give the canvas the full height and width of the viewport

canvas.width = innerWidth;
canvas.height = innerHeight;

const canvasContext = canvas.getContext('2d');
const centerY = canvas.height / 2;
const centerX = canvas.width / 2;


class Player {
    constructor(x, y, radius, color) {
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

const player = new Player(centerX, centerY, 30, "#737373");
player.draw();


/* const projectiles */
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
        this._velocity = velocity;
    }
    
    draw() {
        canvasContext.beginPath();
        canvasContext.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
        canvasContext.fillStyle = this._color;
        canvasContext.fill();
    }
    update() {
        this.draw();
        this._x += this._velocity.x;
        this._y += this._velocity.y;
    }  
}


// Enemy ;
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
        this._velocity = velocity;
    }

    draw() {
        canvasContext.beginPath();
        canvasContext.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
        canvasContext.fillStyle = this._color;
        canvasContext.fill();
    }
    update() {
        this.draw();
        this._x += this._velocity.x;
        this._y += this._velocity.y;
    }
}

const projectiles = [];
const enemies = [];

function SpawnEnemies() {
    // setInterval(() => {
        const radius = Math.floor(Math.random() * 20) + 10;

        let x, y;
        if (Math.random() < 0.5) {
            x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() > 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = 'green';
        const angle = Math.atan2( centerY-y, centerX-x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));
        console.log(enemies)

    // },1000)
}


// Animation frame loop(); 
const animate = () => {
    requestAnimationFrame(animate);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update();
    });
    
    enemies.forEach(enemy => { 
        enemy.update();
        projectiles.forEach(
            projectile => {
                const distance = Math.hypot(projectile._x - enemy._x,projectile._y - enemy._y);
                    console.log(distance)
            }
        ) 
    })
    /*     console.log("good");
    projectile.draw();
    projectile.update(); */
}

// window can be omitted;
window.addEventListener('click', (event) => {
    const { x, y } = event;
    const angle = Math.atan2(y - centerY, x - centerX);
    const radius = Math.floor(Math.random() * 20);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
    }
    
    projectiles.push(new Projectile(centerX, centerY, radius, "red", velocity));
    
    
});

animate();
SpawnEnemies()