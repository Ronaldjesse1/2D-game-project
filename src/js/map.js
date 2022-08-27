
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
        let points_graphicobjects = [];
        let i = 0;
        points.forEach(([x, y]) => {
            console.log(x, y, i);
            points_graphicobjects.push(new Graphics.GraphicsImage({
                id: 'level-' + i,
                imgid: 'level',
                x: x,
                y: y,
                width: 50,
                height: 50,
            }));
            i++;
        });
        Graphics.add_object(new Graphics.GraphicsImage({
            id: 'map',
            imgid: 'map-' + this.id,
            x: 0,
            y: Graphics.height - Map.height,
            width: Graphics.width,
            height: Graphics.height,
            children: points_graphicobjects
        }));
    }

   offsetx(dx) {
        if (dx > 0) this._offsetx = Math.min(Map.width - Graphics.width, this._offsetx + dx);
        else this._offsetx = Math.max(0, this._offsetx + dx);
        Graphics.objects['map'].x = -this._offsetx
    }

   offsety(dy) {
        // range of _offsety: 0 - Map.height - Graphics.height
        console.log(dy)
        if (dy > 0) this._offsety = Math.max(0, this._offsety - dy);
        else this._offsety = Math.min(1500, this._offsety - dy);
        Graphics.objects['map'].y = -this._offsety
    }
}

const Maps = [
    new Map({
        id: 0,
        name: '', 
        points: [
            [375, 1700],
            [50, 1700],
            [50, 1500],
            [500, 1500],
            [500, 1200],
            [500, 900],
            [50, 900],
            [50, 400],
            [650, 400],
            [650, 100],
        ]}),
];
export { Map, Maps };
