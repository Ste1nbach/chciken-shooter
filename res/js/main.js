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



const bot = new Chicken();


const generate = () => {
           i++;
           
        if(i % 430 == 0) {
            do{
                posY = Math.floor (Math.random() * canvas.height);
                bot.position.y = posY;
            }while(posY < 50 || posY > 300);
            console.log("de");
            
            bot.position.x = 50;
            
            
    }
    bot.update();
       
        console.log(posY);
    

}


const draw = () => {
    for(let i = 0; i < 10; i++) {
        ctx.fillRect(bot.position.x, bot.position.y, bot.width, bot.height);
    }
}





function botMovement() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bot.position.x += 5;
    generate();
    requestAnimationFrame(botMovement);
}

botMovement();
