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
        this.position = {
            x: 50,
            y: 800,
        };
        this.width = 10;
        this.height = 10;
        
    }

    draw() {
        ctx.drawImage(chickenImg, this.width, this.height);
    }
    update() {
        this.draw();
    }
}

let chickenImg = new Image;

chickenImg.src = "./res/img/chicken.jpg";
const bot = new chicken(chickenImg);



function botMovement() {
    bot.update();

    for(;bot.position.x < canvas.width;) {
        bot.position.x = bot.position.x + 50;
        console.log(bot.position.x);
        
    }
    requestAnimationFrame(botMovement);
}

botMovement();