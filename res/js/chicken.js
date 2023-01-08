import {canvas, wrap, btn, ctx} from "./canvas.js";

export class Chicken {
    constructor() {
        this.position = {
            x: 50,
            y: Math.random() * canvas.height,
        };
        this.width = 50;
        this.height = 50;
        
    }

    draw() {
        ctx.fillRect(this.position.x, this. position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}