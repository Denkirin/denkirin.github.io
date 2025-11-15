import { Rect } from "../dependencies.js";

export class Hitbox{

    constructor(pos, size, debug = false){

        this.bounds = new Rect(pos, size)
        this.debug = debug;
        this.coliding = false;

    }

    update(delta, pos = this.pos, size = this.size){
        this.bounds.transform(pos, size);

    }

    draw(ctx){

        if (this.debug){

            ctx.strokeStyle = (this.coliding) ? 'red' :'green';
            ctx.strokeRect(this.bounds.left, this.bounds.top, this.bounds.size.x, this.bounds.size.y);

        }

    }

    testColision(newPos, otherHitbox){
        if (otherHitbox == this) return(false);

        let record = this.bounds.nw.clone()
        let ret = false;
        
        this.bounds.transform(newPos);
        ret = this.bounds.overlap(otherHitbox.bounds);

        this.bounds.transform(record);

        return(ret);

    }

}