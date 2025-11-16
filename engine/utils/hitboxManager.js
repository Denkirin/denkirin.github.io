export class HitboxManager{

    constructor(hitboxes){

        this.hitboxes = hitboxes;
        this.index = 0;

    }

    update(delta, posDelta){
        
        for (const hitbox of this.hitboxes) {

            hitbox.update(delta, posDelta);

        }

    }

    draw(ctx){
        
        this.hitboxes[this.index].draw(ctx);
    }

    next(){

        this.index = (this.index + 1) % length(this.hitboxes);

    }

    reset(){

        this.index = 0;

    }

    testColision(posDelta, otherHitbox){

        return(this.hitboxes[this.index].testColision(posDelta, otherHitbox));

    }

    getHitbox(){

        return(this.hitboxes[this.index]);

    }
}