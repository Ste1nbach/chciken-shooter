import { canvas, wrap, btn, ctx, array} from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    bot.position.x = 0;
}



const bot = new Chicken();


const generate = () => {
    for(let i = 0; i < 10; i++) {
        array[i] = Math.floor (Math.random() * canvas.height); 
        bot.position.y = array[i];
        console.log(bot.position.y);
    }

}
generate();

const draw = () => {
    for(let i = 0; i < 10; i++) {
        ctx.fillRect(bot.position.x, bot.position.y, bot.width, bot.height);
    }
}

draw();



function botMovement() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bot.update();
    bot.position.x += 5;
    
   
    requestAnimationFrame(botMovement);
}

botMovement();
