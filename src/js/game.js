import { Player } from './player.js';
import { Graphics } from './graphics.js';

class Game {

    static init() {
        let circle = new Graphics.GraphicsCircle({
            id: 'test_circle',
            r: 25,
            x: 20,
            y: 50,
        });
        Graphics.add_object(circle)
        window.setInterval(Game.loop, 500)
    }

    static loop() {
        let circle = Graphics.objects['test_circle'];
        if (circle) {
            circle.x++;
            circle.y++
        }
        Graphics.render();
    }
}

export { Game };

