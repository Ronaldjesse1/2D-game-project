
import { Graphics } from './graphics.js';

class Map {

    static height = 2000
    static width = 800

    _offsetx = 0
    _offsety = 1500

    points = []
    name = null

    constructor({ id, name, points }) {
        if (!points) { console.log('ERROR map created without path'); return; }
        this.id = id 
        this.name = name || 'map' + this.id;
        this.points = points;
        Graphics.add_object(new Graphics.GraphicsImage({
            id: 'map',
            imgid: 'map-' + this.id,
            x: 0,
            y: Graphics.height - Map.height,
            width: Graphics.width,
            height: Graphics.height
        }));
    }

   offsetx(dx) {
        if (dx > 0) this._offsetx = Math.min(Map.width - Graphics.width, this._offsetx + dx);
        else this._offsetx = Math.max(0, this._offsetx + dx);
        Graphics.objects['map'].x = -this._offsetx
    }

   offsety(dy) {
        if (dy > 0) this._offsety = Math.min(Map.height - Graphics.height, this._offsety - dy);
        else this._offsety = Math.min(Map.height - Graphics.height, this._offsety - dy);
        Graphics.objects['map'].y = -this._offsety
    }
}


// TODO
class MapNode {
    loc = []
    up = null
    down = null
    left = null
    right = null
    constructor(loc) {
        this.loc = loc
    }
}

const Maps = [
    new Map({
        id: 0,
        name: '', 
        points: [
            [400, 1950],
            [400, 1700]
        ]}),
];
export { Map, Maps };
