import { canvas, wrap, btn, ctx} from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    bot.position.x = 0;
}



const bot = new Chicken();



function botMovement() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bot.update();

    

    bot.position.x += 5;

    requestAnimationFrame(botMovement);
}

botMovement();