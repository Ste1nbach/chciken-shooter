import { canvas, wrap, btn, ctx } from "./canvas.js";
import { Chicken } from "./chicken.js";
import { Airplane } from "./plane.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chickenRemove = new Image;
let chickenRot = new Image;
let chickenGolden = new Image;
let planeImg = new Image;

chickenRemove.src = "./res/img/ptak-remove.png";
chickenRot.src = "./res/img/ptak2-remove.png";
chickenGolden.src = "./res/img/golden2.png";
planeImg.src = "./res/img/letadlo2.png";

let chicken = [];
let arrayLength = 10;
let start = false;
let pts = 0;
let HP = 10;
let death = false;
let goldenSpawn = false;
let planeSpawn = false;
let chance = Math.floor(Math.random() * 5000);
let chance2 = Math.floor(Math.random() * 2000);
let posY = Math.floor(Math.random() * canvas.height);

//const golden = new GoldenChicken(0, chickenGolden, "leftToRight");
const plane2 = new Airplane(0, planeImg, "rightToLeft");

btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
    start = true;
}

const generate = () => {

    for (let i = 0; i < chicken.length; i++) {

        chance = Math.floor(Math.random() * 5000);
        chance2 = Math.floor(Math.random() * 2000);

        if (chance == 5 && goldenSpawn == false) {
            posY = Math.floor(Math.random() * (500 - 0) + 0);
            goldenSpawn = true;
            chicken.push(new Chicken(-150 * i, chickenGolden, "leftToRight", "golden"));
        }

        if (chance2 == 5 && planeSpawn == false) {
            posY = Math.floor(Math.random() * (500 - 0) + 0);
            plane2.position.y = posY;
            plane2.position.x = canvas.width;
            planeSpawn = true;
        }

        if (planeSpawn == true) {
            plane2.update();
        }

        if (chicken[i].direction == "leftToRight") {
            if (chicken[i].position.x > canvas.width) {
                posY = Math.floor(Math.random() * (500 - 0) + 0);
                chicken[i].position.y = posY;
                chicken[i].position.x = canvas.width;
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
            if (chicken[i].rarity == "golden") {
                pts = pts + 5;
                if (chicken[i].direction == "leftToRight") {
                    goldenSpawn = false;
                    generate();
                }
                chicken.splice(i, 1);
            } else {
                pts++;
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
        // golden.position.x += 3;
        plane2.position.x -= 3;

        generate();
    }
    requestAnimationFrame(gameLoop);
    score();
    hp();
    end();
}

generateChickens();
gameLoop();