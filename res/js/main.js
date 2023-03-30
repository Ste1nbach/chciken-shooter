import { canvas, wrap, btn, ctx } from "./canvas.js";
import { Chicken } from "./chicken.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chickenRemove = new Image;
let chickenRot = new Image;
const chicken = [];
let start = false;
let pts = 0;
let HP = 1;
let death = false; 

chickenRemove.src = "./res/img/ptak-remove.png";
chickenRot.src = "./res/img/ptak2-remove.png";


let posY = Math.floor(Math.random() * canvas.height);


btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    start = true;
}


/*
const bot = new Chicken(0, chickenRemove);
const bot2 = new Chicken(canvas.width, chickenRot);

chicken.push(bot);
chicken.push(bot2);
*/

// nekonecny slepice dokud HP se nebudou rovnat nule

const generate = () => {

    if (HP == 0) {
        start = false;
        death = true;
       for(let i = 0; i < chicken.length; i++) {
        chicken.splice(i, 0);
        chicken.splice(0, i);
       }
        
        if(death = true) {
            ctx.fillStyle = "white";
            ctx.font = "bold 30px sans-serif";
            ctx.fillText("GAME OVER PRESS SPACE TO RESTART", canvas.width / 2 - 250, canvas.height / 2);
        }
        
    }

    
    if(start == false) {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
              case " ":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                start = true;
                death = false;
                console.log(e.key);
                console.log(death);
                console.log(start);
                break;
            }
          });
    }
    

    for (let i = 0; i < chicken.length; i++) {

        if (chicken[i].direction == "leftToRight") {
            if (chicken[i].position.x > canvas.width) {
                posY = Math.floor(Math.random() * (500 - 0) + 0);
                chicken[i].position.y = posY;
                chicken[i].position.x = 0;
                HP--;
            }

        } else {
            if (chicken[i].position.x < 0) {
                posY = Math.floor(Math.random() * (500 - 0) + 0);
                chicken[i].position.y = posY;
                chicken[i].position.x = canvas.width;
                HP--;
            }
        }

        chicken[i].update();
    }

}



const score = () => {
    ctx.fillStyle = "white";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`Score: ${pts}`, 20, 30);
}

const hp = () => {
    ctx.fillStyle = "white";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`HP: ${HP}`, 20, 60);
}



canvas.addEventListener('click', function (event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    for (let i = 0; i < chicken.length; i++) {
        if ((chicken[i].position.x <= clickX && chicken[i].position.x + chicken[i].width >= clickX) && (chicken[i].position.y <= clickY && chicken[i].position.y + chicken[i].height >= clickY)) {
            console.log("trefil jsem slepici");
            chicken.splice(i, 1);
            pts++;
        }
    }
});

const generateChickens = () => {
    for (let i = 1; i <= 20 + pts; i++) {
        if (i % 2 == 0) {
            chicken.push(new Chicken(canvas.width + i * 150, chickenRot, "rightToLeft"));
        } else {
            chicken.push(new Chicken(-150 * i, chickenRemove, "leftToRight"));
        }
    }
}

function gameLoop() {

    if (chicken.length == 0) {
        return;
    }

    if (start == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < chicken.length; i++) {
            if (chicken[i].direction == "leftToRight") {
                chicken[i].position.x += 3;
            } else {
                chicken[i].position.x -= 3;
            }
        }

        generate();
    }
    requestAnimationFrame(gameLoop);
    score();
    hp();
}

if(start = true) {
    generateChickens();
}

gameLoop();