import { Player } from './player.js';
import { Graphics } from './graphics.js';
import { User } from './user.js';

function myCallback(){
    console.log('hhhh');
    Graphics.gameLoop();
}
window.onload = () => {
    User.load_data();
    Graphics.init();
    Graphics.render_start_screen();
    setInterval(myCallback, 500);
    
}
