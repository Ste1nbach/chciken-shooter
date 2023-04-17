import { canvas, ctx } from "./canvas.js";

export class Btn {
    constructor(btnImg) {
        this.position = {
            x: canvas.width - 200,
            y: canvas.height - 170
        };
        this.width = 150;
        this.height = 150;
        this.btnImg = btnImg;
    }

    draw() {
        ctx.drawImage(this.btnImg, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}