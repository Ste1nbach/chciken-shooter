import {canvas, wrap, btn, ctx, array} from "./canvas.js";

let chickenRemove = new Image;

chickenRemove.src = "./res/img/chicken-remove.png";

export class Chicken {
    constructor(xpos) {
        this.position = {
            x: xpos,
            y: Math.floor(Math.random() * (500 - 0) + 0)
        };
        this.width = 150;
        this.height = 150;
    }


    draw() {
        ctx.drawImage(chickenRemove, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}