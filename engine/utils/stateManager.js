export class StateManager {
    constructor(sprites, hitboxes){
        
        this.sprites = sprites;
        this.hitboxes = hitboxes;

        this.state = Object.keys(sprites)[0];

        this.tsCount = 0
        this.spriteChanged = false;
        this.index = 0;

    }

    update(delta, posDelta){

        this.tsCount += delta;
        this.spriteChanged = false;

        if (this.tsCount >= this.speed){
            this.index = ( this.index + 1 ) % ( this.numx * this.numy );
            this.tsCount -= this.speed;
            this.spriteChanged = true;
        }
        
        this.sprites[this.state].update(delta, posDelta);
        this.hitboxes[this.state].update(delta, posDelta);

    }

    draw(ctx, pos){
        
        this.sprites[this.state].draw(ctx, pos);
        this.hitboxes[this.state].draw(ctx, pos);

    }

    changeState(newState){

        this.state = newState;
        this.sprites[this.state].reset();
        this.hitboxes[this.state].reset();

    }

    testState(delta, newPos, entities){
        this.hitboxes[this.state].testState(delta, newPos, entities);
    }

    testColision(posDelta, otherHitbox){

        return(this.hitboxes[this.state].testColision(posDelta, otherHitbox));

    }

    getHitbox(){

        return(this.hitboxes[this.state].getHitbox());

    }

    getSprite(){

        return(this.sprites[this.state]);

    }

}