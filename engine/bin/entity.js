export class Entity
{
	constructor(pos, vel, size, stateManager){
		this.pos = pos.clone();
        this.vel = vel.clone();
        this.size = size.clone();
        this.stateManager = stateManager;
	}

	testState(delta, newPos, entities){

		let colision = false;

		for (const entity of entities) {
            colision = colision || this.stateManager.testColision(this.vel.scaleClone(delta), entity.getHitbox());
        };

		return colision;

	}
	
	update(delta)
	{	

		this.pos.sum(this.vel.scaleClone(delta));
		this.stateManager.update(delta, this.vel.scaleClone(delta));
	}
	
	draw(ctx)
	{
		this.stateManager.draw(ctx);
	}

	colide(){

		this.colision = true;

	}

	getHitbox(){
		return(this.stateManager.getHitbox());
	}

}