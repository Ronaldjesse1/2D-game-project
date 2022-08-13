
import { Graphics } from './graphics.js';

class GameEngine {

    scenedata = null;

    constructor() {

    }

    init() {
        
    }

    start(sceneName) {
        this.loadScene(sceneName);
        // window.setInterval(() => this.loop(), 10);
    }

    draw() {
        if (this.scenedata.background_image) {
            Graphics.ctx.drawImage(this.scenedata.background_image.img, 0, 0);
        }

        if (this.scenedata.gameobjects) {
            this.scenedata.gameobjects.forEach(
                obj => {

                    if (obj.type == 'static' && obj.img) {
                        Graphics.ctx.drawImage(obj.img, obj.position.x, obj.position.y);
                        // obj.position.x += 1;
                        // obj.position.y += 1;
                    }

                }
            );
        }
    }

    loop() {
        // console.log("loop");
        Graphics.ctx.clearRect(0, 0, Graphics.width, Graphics.height);
        this.draw();
    }

    loadScene(sceneName) {
        console.log("loadScene", sceneName);
        fetch(sceneName)
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            console.log(jsondata);

            this.scenedata = jsondata;

            if (this.scenedata.background_image) {
                this.loadBackgroundImage(this.scenedata.background_image);
            }

            this.loadResources();

            window.setInterval(() => this.loop(), 10);
        });
    }

    loadBackgroundImage(background_image) {
        let img = new Image;
        img.src = background_image.url;
        img.onload = function() {
            background_image.img = img;
        }
    }

    loadResources() {
        if (this.scenedata.gameobjects) {
            this.scenedata.gameobjects.forEach(
                obj => {
                    if (obj.resource_type == 'image') {
                        console.log(obj);
                        let img = new Image;
                        img.src = obj.url;
                        img.onload = function() {
                            console.log("loaded", img.src);
                            obj.img = img;
                        };
                    }
                }
            );
        }
    }
}

export { GameEngine }