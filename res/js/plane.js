import { ctx } from "./canvas.js";

export class Airplane {
    constructor(xpos, planeImg, direction) {
        this.position = {
            x: xpos,
            y: Math.floor(Math.random() * (500 - 0) + 0)
        };
        this.width = 150;
        this.height = 150;
        this.planeImg = planeImg;
        this.direction = direction;
    }


    draw() {
        ctx.drawImage(this.planeImg, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}