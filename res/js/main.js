import { canvas, wrap, btn, ctx} from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chickenRemove = new Image;
let chickenRot = new Image;
let start = false;

chickenRemove.src = "./res/img/ptak-remove.png";
chickenRot.src = "./res/img/ptak2-remove.png";


let posY = Math.floor (Math.random() * canvas.height);


btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    start = true;
}

const chicken =  [];
/*
const bot = new Chicken(0, chickenRemove);
const bot2 = new Chicken(canvas.width, chickenRot);

chicken.push(bot);
chicken.push(bot2);
*/

const generateChickens = () => {
    for (let i = 1; i < 30; i++) {
        if(i%2 == 0) {
            chicken.push(new Chicken(canvas.width + i * 150, chickenRot, "rightToLeft"));
        } else {
            chicken.push(new Chicken(-150 * i, chickenRemove, "leftToRight"));
        }
    }
}



const generate = () => {

        for(let i = 0; i < chicken.length; i++){

            if(chicken[i].direction == "leftToRight") {
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

    for(let i = 0; i < chicken.length; i++) {
        if((chicken[i].position.x <= clickX && chicken[i].position.x + chicken[i].width >= clickX) && (chicken[i].position.y <= clickY && chicken[i].position.y + chicken[i].height >= clickY)){
            console.log("trefil jsem slepici");
            chicken.splice(i, 1);
        }
    }
});


function botMovement() {

    if(chicken.length == 0) {
        document.write("game over");
        return;
    }
    
    if(start == true) {

   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < chicken.length; i++) {
        if(chicken[i].direction == "leftToRight") {
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
generateChickens();
botMovement();