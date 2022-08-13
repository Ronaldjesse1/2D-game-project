import { Graphics } from './graphics.js';
import { User } from './user.js';
import { Game } from './game.js';
import { Input } from './input.js';
import { GameEngine } from './gameengine.js';

window.onload = () => {
    User.load_data();
    Input.init();
    Graphics.init(() => {

        let gameEngine = new GameEngine();

        Graphics.clear_screen();
        let width = Graphics.width * 0.6,
            height = Graphics.height * 0.5,
            x = Graphics.width * 0.2,
            y = Graphics.height * 0.25;

        let start_img = new Graphics.GraphicsImage({
            id: 'start_screen_bg',
            src: 'start-bg',
            x: 0,
            y: 0,
            width: Graphics.width,
            height: Graphics.height
        });

        let text = new Graphics.GraphicsText({
            id: 'start_screen_text',
            text: 'click to start',
            align: 'center',
            base: 'middle',
            font: '40px serif',
            fillStyle: 'blue',
            x: width / 2,
            y: height / 2
        });

        let button = new Graphics.GraphicsRectangle({
            id: 'start_screen_rect',
            x: x,
            y: y,
            width: width,
            height: height,
            children: [text],
            opacity: 0,
            strokeStyle: 'blue',
            fillStyle: 'purple',
            onmousedown: function() {
                console.log('start game');
                delete Graphics.objects['start_screen_bg'];
                delete Graphics.objects['start_screen_rect'];
                // Game.start();
                gameEngine.start("./resources/scenes/scene1.json");
            }
        });
        // Game.init();
        gameEngine.init();
        Graphics.add_object(start_img);
        Graphics.add_object(button);
        Graphics.render();
    });
}
