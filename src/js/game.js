import { Graphics } from './graphics.js';
import { Input, InputStatus } from './input.js';
import { User } from './user.js';
import { Maps } from './map.js';
import { Utils } from './utils.js';
import { Level } from './level.js';

class Game {

    static map;
    static player_loc = 0;
    static active = false;
    static player_step = 2;
    static map_padding = 25;

    static init() {

        Game.map = Maps[User.mapno];

        Input.keydown.subscribe('Escape', () => {
            Game.active ^= true;
            if (Game.active) Game.loop();
        });
    }

    static loop() {
        if (InputStatus['w']) Game.player_move(0, -Game.player_step);
        if (InputStatus['s']) Game.player_move(0, Game.player_step);
        if (InputStatus['d']) Game.player_move(Game.player_step, 0);
        if (InputStatus['a']) Game.player_move(-Game.player_step, 0);
        Game.active && requestAnimationFrame(Game.loop);
    }

    static start() {

        Graphics.render_image();
        Graphics.clear_screen();

        Graphics.add_object(new Graphics.GraphicsImage({
            id: 'player',
            x: Game.map.points[0][0] - Game.map._offsetx - 25,
            y: Game.map.points[0][1] - Game.map._offsety - 25,
            strokeStyle: 'black',
            width: 50,
            height: 50,
            imgid: 'player',
        }));

        Graphics.render();
        Game.active = true;
        Game.loop();
    }

    static player_move(dx, dy) {

        let player = Graphics.objects['player'];

        if (player.x + dx > Game.map_padding && player.x + player.width + dx < Graphics.width - Game.map_padding) {
            player.x += dx;
        } else {
            Game.map.offsetx(dx);
        }

        if (player.y + dy > Game.map_padding && player.y + player.height + dy < Graphics.height - Game.map_padding) {
            player.y += dy;
        } else {
            Game.map.offsety(-dy)
        }

        Graphics.render();
    }

    static Level = class {
        constructor() {
        }
    }
}


export { Game };
