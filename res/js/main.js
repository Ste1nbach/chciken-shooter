const canvas = document.querySelector("canvas");
const wrap = document.getElementById("wrap");
const wrapper = document.getElementById("wrapper");
const btn = document.getElementById("btn");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
}

class chicken {
    constructor() {
        this.width = 50;
        this.height = 50;
        // this.img = new Image();
        // this.path = "./res/img/chicken.jpg";
        // this.img.src = this.path;
        this.position = {
            x: 200,
            y: 200,
        };
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect( this.width, this.height, this.position.x, this.position.y);
    }
    update() {
        this.draw();
    }
}

const bot = new chicken();

function botMovement() {
    requestAnimationFrame(botMovement);
    bot.update();

    for(;bot.position.x < canvas.width;) {
        bot.position.x = bot.position.x + 1;
        console.log(bot.position.x);

    }

}

botMovement();
