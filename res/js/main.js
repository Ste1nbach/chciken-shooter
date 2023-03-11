import { canvas, wrap, btn, ctx, array} from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let posY = Math.floor (Math.random() * canvas.height);
let i = 0;

btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    bot.position.x = 0;
}

const bot = new Chicken(50);

const generate = () => {

        if(bot.position.x > canvas.width) {
            posY = Math.floor(Math.random() * (500 - 0) + 0);
            bot.position.y = posY;
            console.log("de");
            
            bot.position.x = 0;   
            console.log("bot y " + posY);
        console.log("bot x " + bot.position.x) 
    }
    bot.update();
}


canvas.addEventListener('click', function(event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    if((bot.position.x <= clickX && bot.position.x + bot.width >= clickX) && (bot.position.y <= clickY && bot.position.y + bot.height >= clickY)){
        console.log("trefil jsem slepici");
    }
});


function botMovement() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bot.position.x += 3;
    generate();
    requestAnimationFrame(botMovement);
}

botMovement();
