import { Player } from './player.js';
import { Graphics } from './graphics.js';
import { User } from './user.js';

window.onload = () => {
    User.load_data();
    Graphics.init();
    // Graphics.render_start_screen();
}
