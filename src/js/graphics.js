import { User } from './user.js';
import { Utils } from './utils.js';

class Graphics {

    static ctx;
    static width;
    static height;
    static offsetX;
    static offsetY;

    static images = {};

    static objects = [];

    static init() {

        let canvas = document.getElementById('game');
        if (!canvas) { alert('unsupported browser or error loading resources'); return };

        this.ctx = canvas.getContext('2d');
        if (!this.ctx) { alert('unsupported browser or error loading resources'); return };

        // this.width = Math.floor(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.6);
        // this.height = Math.floor( (window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight) * 0.6 );
        
        this.width = 800;
        this.height = 500;
        this.offsetX = canvas.offsetLeft;
        this.offsetY = canvas.offsetTop;
        
        let scale = window.devicePixelRatio;

        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';
        canvas.width = Math.floor(this.width * scale);
        canvas.height = Math.floor(this.height * scale);
        canvas.style.border = '1px solid black';
        
        this.ctx.scale(scale, scale);

        canvas.oncontextmenu = () => false;

        canvas.onmousedown = (e) => {

            let x = (e.x || e.pageX || e.clientX || e.layerX) - this.offsetX,
                y = (e.y || e.pageY || e.clientY ||e.layerY) - this.offsetY;

            for (const object of Graphics.objects) {
                if (!object.onmousedown) continue;
                // collission
                if (object instanceof Graphics.GraphicsRectangle && Utils.point_in_rect(x, y, object)) {
                    object.onmousedown(e);
                } else if (object instanceof Graphics.GraphicsCircle && Utils.point_in_circle(x, y, object)) {
                    object.onmousedown(e);
                } 
            }
        }

        canvas.onmouseup = (e) => {
            let x = (e.x || e.pageX || e.clientX || e.layerX) - this.offsetX,
                y = (e.y || e.pageY || e.clientY ||e.layerY) - this.offsetY;
        }

        canvas.onmousemove = (e) => {
            let x = (e.x || e.pageX || e.clientX || e.layerX) - this.offsetX,
                y = (e.y || e.pageY || e.clientY ||e.layerY) - this.offsetY;
        }

        canvas.onmouseenter = (e) => {
        }

        canvas.onmouseleave = (e) => {
        }

        // load images
        let images = {
            'start-bg': 'sources/start-bg.jpg'
        };

        for (const [title, src] of Object.entries(images)) {
            let img = new Image;
            img.src = src;
            console.log('loading ' + title);
            img.onload = function() {
                console.log('loaded ' + title)
                Graphics.images[title] = this;
                if (Object.keys(Graphics.images).length == Object.keys(images).length) {
                    console.log('all images loaded');
                    Graphics.render_start_screen();
                }
            }

        }

        this.clear_screen();

        console.log('Graphics.init() successful')
    }


    static loaded(f) {
        this.loaded_callback = f;
    }

    static render() {
        for (const object of this.objects) {
            object.render();
        }
    }

    static render_map() {
        User.data.map;
        User.data.level;
    }

    static render_player() {
    }

    // could either save them in Graphics.images or load them each time from cache.
    static render_image(image, x, y) {
        console.log('render_image called', image);

        var img = Graphics.images[image];
        if (img) {
            Graphics.ctx.drawImage(img, x || 0, y || 0);
        }
    }

    static clear_screen(color) {
        this.ctx.fillStyle = color || 'white';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    static render_text(text, x, y, align, font) {
        this.ctx.fillStyle = font || '30px serif';
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
    }


    static render_start_screen() {

        this.clear_screen();

        this.render_image('start-bg');

        let width = this.width * 0.6,
            height = this.height * 0.5,
            x = this.width * 0.2,
            y = this.height * 0.25;

        let text = new this.GraphicsText({
            text: 'click to start',
            align: 'center',
            base: 'middle',
            font: '40px serif',
            fillStyle: 'blue',
            x: width / 2,
            y: height / 2
        });

        let button = new this.GraphicsRectangle({
            x: x,
            y: y,
            width: width,
            height: height,
            children: [text],
            opacity: '',
            strokeStyle: 'blue',
            fillStyle: 'purple',
            onmousedown: (e) => console.log('start game')
        });


        let test_circle = new this.GraphicsCircle({
            x: 100,
            y: 100,
            r: 25,
            strokeStyle: 'red',
            fillStyle: 'yellow',
            onmousedown: () => console.log('test circle clicked')
        });

        Graphics.objects.push(button);
        Graphics.objects.push(test_circle);
        Graphics.render();
        console.log(Graphics.objects);
    }
    static gameLoop(){
        Graphics.render();
        

        var circle = Graphics.objects[1];
        if (circle) {
            circle.x ++;
            circle.y ++;
        }
        // Graphics.objects.test_circle.x ++;
        // Graphics.objects.test_circle.y ++;
        // console.log(Graphics.objects.test_circle.x);
    }
    static GraphicsObject = class {

        constructor({ type, x, y, fillStyle, strokeStyle, children, onmousedown }) {

            this.x = x || 0;
            this.y = y || 0;
            this.fillStyle = fillStyle || 'black';
            this.strokeStyle = strokeStyle || null;
            this.children = children || [];
            this.onmousedown = onmousedown || null;
            this.onmouseover = onmouseover || null;
            // this.onmouseleft = onmousedown || null;
            // this.onmouseright = onmoueleft || null;

            this.draggable = false;
        }
        render() {
            Graphics.ctx.translate(this.x, this.y);
            for (let i = 0; i < this.children; i++) {
                this.children[i].render();
            }
            Graphics.ctx.translate(-this.x, -this.y);
        }
        add_child(child) {}
    }

    static GraphicsRectangle = class extends Graphics.GraphicsObject {

        constructor({ x, y, width, height, children, strokeStyle, fillStyle, onmousedown }) {
            super({ x: x, y: y, strokeStyle: strokeStyle, fillStyle: fillStyle, children: children, onmousedown: onmousedown });
            this.width = width;
            this.height = height;
        }

        render() {

            Graphics.ctx.fillStyle = this.fillStyle;

            if (this.strokeStyle) {
                Graphics.ctx.strokeStyle = this.strokeStyle;
                Graphics.ctx.strokeRect(this.x, this.y, this.width, this.height);
            }

            Graphics.ctx.fillRect(this.x, this.y, this.width, this.height);
            
            Graphics.ctx.translate(this.x, this.y);
            for (const child of this.children) child.render();
            Graphics.ctx.translate(-this.x, -this.y)
        }
    }

    static GraphicsCircle = class extends Graphics.GraphicsObject {
        constructor({ x, y, r, fillStyle, strokeStyle, children, onmousedown }) {
            super({x: x, y: y, fillStyle: fillStyle, strokeStyle: strokeStyle, children: children, onmousedown: onmousedown});
            this.r = r;
        }
        render() {
            
            Graphics.ctx.fillStyle = this.fillStyle;
            Graphics.ctx.beginPath();
            Graphics.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            Graphics.ctx.fill();
            if (this.strokeStyle) {
                Graphics.ctx.strokeStyle = this.strokeStyle;
                Graphics.ctx.stroke();
            }
            Graphics.ctx.closePath();
        }
    }

    // https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Drawing_text
    // TODO make text background
    static GraphicsText = class extends Graphics.GraphicsObject {

        constructor({ text, x, y, align, base, font, fillStyle, strokeStyle }) {
            super({ x: x, y: y, fillStyle: fillStyle, strokeStyle: strokeStyle });
            this.text = text;
            this.align = align || 'center';
            this.base = base || 'bottom';
            this.font = font || '30px serif';
        }

        render() {
            Graphics.ctx.clear
            Graphics.ctx.textAlign = this.align;
            Graphics.ctx.font = this.font;
            Graphics.ctx.textAlign = this.align;
            Graphics.ctx.textBaseline = this.base;
            Graphics.ctx.fillStyle = this.fillStyle;

            if (this.stokeStyle) {
                Graphics.ctx.strokeStyle = this.strokeStyle;
                Graphics.ctx.strokeText(this.text, this.x, this.y);
            }

            Graphics.ctx.fillText(this.text, this.x, this.y);
        }
    }
    

}

export { Graphics };
