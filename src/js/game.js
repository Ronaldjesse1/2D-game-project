import { Player } from './player.js';
import { Graphics } from './graphics.js';
import { Input } from './input.js';

class Game {

    static init() {
        this.circle = new gametestcircle
    }

    static loop() {
        this.circle.draw()
    }

    static start() {
        window.setInterval(() => this.loop(), 10)
    }
}

class gametestcircle {

    constructor() {

        this.velx = 1
        this.vely = 1

        Graphics.add_object(new Graphics.GraphicsCircle({
            id: 'test_circle',
            r: 25,
            x: 20,
            y: 50,
        }));
        Input.keydown.subscribe('w', () => this.vely = -1);
        Input.keydown.subscribe('s', () => this.vely = 1);
        Input.keydown.subscribe('a', () => this.velx = -1);
        Input.keydown.subscribe('d', () => this.velx = 1);
    }

    draw() {
        let circle = Graphics.objects['test_circle'];
        if (circle) {
            circle.x += this.velx
            circle.y += this.vely
        }
        Graphics.render();
    }
}

export { Game };
