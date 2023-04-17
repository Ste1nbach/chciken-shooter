import { canvas, ctx } from "./canvas.js";

export class Hearts {
    constructor(img) {
        this.position = {
            x: 10,
            y: canvas.height - 170
        };
        this.width = 150;
        this.height = 150;
        this.img = img;
    }

    draw() {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}