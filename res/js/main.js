import { canvas, wrap, play, ctx } from "./packages/canvas.js";
import { Chicken } from "./packages/chicken.js";
import { Btn } from "./packages/button.js";
import { Hearts } from "./packages/heart.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chickenRemove = new Image;
let chickenRot = new Image;
let chickenGolden = new Image;
let bulletImg = new Image;
let heartImg = new Image;

chickenRemove.src = "./res/img/ptak-remove.png";
chickenRot.src = "./res/img/ptak2-remove.png";
chickenGolden.src = "./res/img/golden2.png";
bulletImg.src = "./res/img/naboj.png";
heartImg.src = "./res/img/srdce.png";

const btn = new Btn(bulletImg);
const heartBtn = new Hearts(heartImg);

let chicken = [];
let ammoCapacity = 7;
let ammo = ammoCapacity;
let cost = 10;
let cost2 = 10;
let timer = 0;
let speed = 2;
let arrayLength = 10;
let start = false;
let pts = 0;
let HP = 10;
let death = false;
let goldenSpawn = false;
let chance = Math.floor(Math.random() * 5000);
let posY = Math.floor(Math.random() * canvas.height);

play.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    start = true;
}

const generate = () => {

    for (let i = 0; i < chicken.length; i++) {

        chance = Math.floor(Math.random() * 5000);

        if (chance == 5 && goldenSpawn == false) {
            posY = Math.floor(Math.random() * (500 - 0) + 0);
            goldenSpawn = true;
            chicken.push(new Chicken(-150 * i, chickenGolden, "leftToRight", "golden"));
        }

        if (chicken[i].direction == "leftToRight") {
            if (chicken[i].position.x > canvas.width) {
                posY = Math.floor(Math.random() * (500 - 0) + 0);
                chicken[i].position.y = posY;
                chicken[i].position.x = canvas.width;
                chicken.splice(i, 1);
                HP--;
            }

        } else {
            if (chicken[i].position.x < 0) {
                posY = Math.floor(Math.random() * (500 - 0) + 0);
                chicken[i].position.y = posY;
                chicken[i].position.x = canvas.width;
                chicken.splice(i, 1);
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

const ammoCount = () => {
    ctx.fillStyle = "white";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`Ammo: ${ammo}`, 20, 90);
}

const reloading = () => {
    ctx.fillStyle = "red";
    ctx.font = "bold 60px sans-serif";
    ctx.fillText(`Reloading`, canvas.width / 2 - 150, canvas.height / 2);
}

const value = () => {
    ctx.fillStyle = "black";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`Cost: ${cost}`, canvas.width - 160, canvas.height - 20);
}

const value2 = () => {
    ctx.fillStyle = "black";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`Cost: ${cost}`, 40, canvas.height - 20);
}

canvas.addEventListener('click', function (event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    if ((btn.position.x <= clickX && btn.position.x + btn.width >= clickX) && (btn.position.y <= clickY && btn.position.y + btn.height >= clickY)) {
        ammo++;
        if (pts >= cost) {
            ammoCapacity += 3;
            pts -= cost;
            cost += 5;
        }
    }

    if((heartBtn.position.x <= clickX && heartBtn.position.x + heartBtn.width >= clickX) && (heartBtn.position.y <= clickY && heartBtn.position.y + heartBtn.height >= clickY)) {
        ammo++;
        if(pts >= cost2) {
            HP++;
            pts -= cost2;
            cost += 5;
        }
    }

    if (ammo != 0) {
        ammo--;

        for (let i = 0; i < chicken.length; i++) {
            if ((chicken[i].position.x <= clickX && chicken[i].position.x + chicken[i].width >= clickX) && (chicken[i].position.y <= clickY && chicken[i].position.y + chicken[i].height >= clickY)) {
                if (chicken[i].rarity == "golden") {
                    pts = pts + 5;
                    if (chicken[i].direction == "leftToRight") {
                        goldenSpawn = false;
                        generate();
                    }
                    chicken.splice(i, 1);
                } else {
                    pts++;
                    speed += 0.03;
                    if (chicken[i].direction == "leftToRight") {
                        generateLeftToRight(i + 3);
                        console.log(chicken.length);
                    } else {
                        generateRightToLeft(i + 3);
                        console.log(chicken.length);
                    }
                    chicken.splice(i, 1);
                }
            }
        }
    }
});

const generateLeftToRight = (i) => {
    chicken.push(new Chicken(-150 * i, chickenRemove, "leftToRight", "basic"));
}

const generateRightToLeft = (i) => {
    chicken.push(new Chicken(canvas.width + i * 150, chickenRot, "rightToLeft", "basic"));
}

const generateChickens = () => {
    for (let i = 0; i < arrayLength; i++) {
        if (i % 2 == 0) {
            generateRightToLeft(i);
        }
        else {
            generateLeftToRight(i);
        }
    }
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
            start = true;
            death = false;
            location.reload();
            break;
    }
});

const end = () => {

    if (HP == 0) {
        start = false;
        death = true;

        if (death == true) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px sans-serif";
            ctx.fillText("GAME OVER PRESS SPACE TO RESTART", canvas.width / 2 - 250, canvas.height / 2);
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
                chicken[i].position.x += speed;
            } else {
                chicken[i].position.x -= speed;
            }



        }

        generate();
    }

    if (ammo == 0) {
        timer++;
        reloading();
        if (timer == 150) {
            ammo = ammoCapacity;
            timer = 0;
        }
    }
    btn.update();
    heartBtn.update();
    requestAnimationFrame(gameLoop);
    value();
    value2();
    score();
    hp();
    ammoCount();
    end();
}

generateChickens();
gameLoop();