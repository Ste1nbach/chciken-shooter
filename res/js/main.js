import { canvas, wrap, btn, ctx} from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chickenRemove = new Image;
let chickenRot = new Image;
let start = false;

chickenRemove.src = "./res/img/ptak.png";
chickenRot.src = "./res/img/ptak2.png";


let posY = Math.floor (Math.random() * canvas.height);


btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    start = true;
}

const chicken =  [];
const bot = new Chicken(0, chickenRemove);
const bot2 = new Chicken(canvas.width, chickenRot);

chicken.push(bot);
chicken.push(bot2);


const generate = () => {

        for(let i = 0; i < chicken.length; i++){

            if(i%2 == 0) {
                if(chicken[i].position.x > canvas.width) {
                    posY = Math.floor(Math.random() * (500 - 0) + 0);
                    chicken[i].position.y = posY; 
                    chicken[i].position.x = 0; 
            }

            } else {
                if(chicken[i].position.x < 0) {
                    posY = Math.floor(Math.random() * (500 - 0) + 0);
                    chicken[i].position.y = posY; 
                    chicken[i].position.x = canvas.width; 
            }
            }

           
        chicken[i].update();
        }

}



canvas.addEventListener('click', function(event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    if((bot.position.x <= clickX && bot.position.x + bot.width >= clickX) && (bot.position.y <= clickY && bot.position.y + bot.height >= clickY)){
        console.log("trefil jsem slepici");
    }
});


function botMovement() {
    
    if(start == true) {

   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < chicken.length; i++) {
        if(i%2 == 0) {
            chicken[i].position.x += 3;
        } else {
            chicken[i].position.x -= 3;
        }
    }

    generate();
   
 }
 requestAnimationFrame(botMovement);
 console.log(start);
    
}

botMovement();