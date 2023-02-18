import {canvas, wrap, btn, ctx, array} from "./canvas.js";

export class Chicken {
    constructor() {
        this.position = {
            x: 50,
            y: Math.random() * canvas.height,
        };
        this.width = 50;
        this.height = 50;
        this.count = []
    }

    draw() {
        ctx.fillRect(this.position.x, this. position.y, this.width, this.height);
        this.count.forEach(element => {element.update()});
    }
    update() {
        this.draw();
    }
}