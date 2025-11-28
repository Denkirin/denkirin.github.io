import * as utils from '../dependencies.js'
import * as globals from './globals.js'

export class Game{
    constructor(viewport, innerWidth, innerHeight) {
        this.entities = [];
        this.canvas = viewport;
        this.bound = 0;
        this.ctx = null;
        this.oldTimestamp = 0;
        this.pause = false;
        this.innerWidth = innerWidth
        this.innerHeight = innerHeight
        this.test = 0
    }

    init() {
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;

        this.bound = this.canvas.height * 0.1;

        this.ctx = this.canvas.getContext('2d');

        // Start the first frame request
        window.requestAnimationFrame((timeStamp)=>this.gameLoop(timeStamp));
    }

    gameLoop(timeStamp) {
        if (this.oldTimestamp == 0) this.oldTimestamp = timeStamp - 0.1;

        const delta = (timeStamp - this.oldTimestamp) * globals.timeFactor;
        
        if (!this.pause) {
            this.update(delta);
        }
        
        this.draw();

        // Keep requesting new frames

        this.oldTimestamp = timeStamp;

        window.requestAnimationFrame((timeStamp)=>this.gameLoop(timeStamp));
    }

    update(delta) {

        let coliding = false;

        for (const entity of this.entities) {
            coliding = entity.testState(delta,0,this.entities);

            if (!coliding){
                entity.update(delta);
            } else {
                
            }
            
            //entity.colide();

        };

    }

    draw() {
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        for (const entity of this.entities) {
            entity.draw(this.ctx);
        };
    }

    add_entity(entity){
        this.entities.push(entity)
    }
}