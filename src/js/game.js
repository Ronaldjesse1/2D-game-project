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

        Graphics.objects['map'].insert_child(new Graphics.GraphicsImage({
            id: 'player',
            x: Game.map.spawn[0],
            y: Game.map.spawn[1],
            strokeStyle: 'black',
            width: 50,
            height: 50,
            imgid: 'player',
        }), 0);
        Graphics.render();
        Game.active = true;
        Game.loop();
    }

    static player_move(dx, dy) {

        let player = Graphics.objects['map'].children[0];

        // update pos, map
        player.x += dx;
        player.y += dy;

        if (dx > 0) player.x = Math.min(player.x, Game.map.width - Game.map_padding - player.width);
        else        player.x = Math.max(player.x, Game.map_padding);

        if (dy > 0) player.y = Math.min(player.y, Game.map.height - Game.map_padding - player.height);
        else        player.y = Math.max(player.y, Game.map_padding);
        
        if (Game.map._offsetx - player.x < Game.map_padding) Game.map.offsetx(dx);
        if (player.y - Game.map._offsety < Game.map_padding || player.y + player.height - Game.map._offsety > Graphics.height - Game.map_padding) Game.map.offsety(-dy);

        // check if player is colliding with level
        for (const level of Graphics.objects['map'].children.slice(1)) {
            if (Utils.rect_touching_rect(player, level)) {
                Graphics.objects['map'].add_child(new Graphics.GraphicsText({
                    id: 'level-alert',
                    x: level.x + level.width / 2,
                    y: level.y + level.height,
                    text: 'press [F] to play (doesnt)',
                    strokeStyle: 'black',
                    align: 'center',
                    font: '10px serif'
                }));
            }
        }

        Graphics.render();
    }

    static Level = class {
        constructor() {
        }
    }
}

export { Game };
