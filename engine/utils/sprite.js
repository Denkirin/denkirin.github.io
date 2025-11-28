export class Sprite {
    constructor(path, pos, posx, posy, sizex, sizey, numx, numy, index = 0, speed = 2,  scale = 4){
        
        this.posx = posx;
        this.posy = posy;
        this.ssWidth = sizex;
        this.ssHeight = sizey;
        this.sWidth = Math.floor(sizex/numx);
        this.sHeight = Math.floor(sizey/numy);
        this.numx = numx;
        this.numy = numy;

        this.index = index;
        this.speed = speed;
        this.scale = scale;

        this.loaded = false;

        this.img = new Image();

        //drawing of the test image - img1
        this.img.onload = (() => {this.loaded = true})

        this.img.src = path;

        this.pos = pos;
    }

    update(delta, posDelta){

        this.pos.sum(posDelta);

    }

    draw(ctx, position){
        let px = this.posx + (this.index % this.numx) * this.sWidth;
        let py = this.posy + Math.floor(this.index / this.numx) * this.sHeight;
        
        ctx.drawImage(this.img, px, py, this.sWidth, this.sHeight, position.x, position.x, this.sWidth * this.scale, this.sHeight * this.scale);
    }

    next(){

        this.index = (this.index + 1) % (this.numx * this.numy);

    }

    reset(){

        this.index = 0;

    }

}