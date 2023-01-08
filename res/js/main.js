import {canvas, wrap, btn, ctx} from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
}



const bot = new Chicken();


function botMovement() {
    requestAnimationFrame(botMovement);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bot.update();
    
   bot.position.x += 5;

   const clickEvent = () => {
    console.log("detect");
}

bot.onclick = clickEvent;

    
}



botMovement();