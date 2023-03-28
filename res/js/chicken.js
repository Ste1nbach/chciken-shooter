import {canvas, wrap, btn, ctx} from "./canvas.js";


export class Chicken {
    constructor(xpos, chicImg, direction) {
        this.position = {
            x: xpos,
            y: Math.floor(Math.random() * (500 - 0) + 0)
        };
        this.width = 150;
        this.height = 150;
        this.chicImg = chicImg;
        this.direction = direction;
    }


    draw() {
        ctx.drawImage(this.chicImg, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}