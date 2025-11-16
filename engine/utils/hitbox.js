import { Rect } from "../dependencies.js";

export class Hitbox{

    constructor(pos, size, debug = false){

        this.bounds = new Rect(pos, size)
        this.debug = debug;
        this.coliding = false;

    }

    update(delta, posDelta){

        this.bounds.transform(posDelta);

    }

    draw(ctx){

        if (this.debug){

            ctx.strokeStyle = (this.coliding) ? 'red' :'green';
            ctx.strokeRect(this.bounds.left, this.bounds.top, this.bounds.size.x, this.bounds.size.y);

        }

    }

    testColision(posDelta, otherHitbox){

        if (otherHitbox == this) return(false);

        let ret = false;
        
        this.bounds.transform(posDelta);
        ret = this.bounds.overlap(otherHitbox.bounds);

        this.bounds.transform(posDelta.rotate(180));

        return(ret);

    }

}