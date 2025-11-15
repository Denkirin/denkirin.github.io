export class Entity
{
	constructor(pos, vel, size, sprites, hitbox){
		this.pos = pos.clone();
        this.vel = vel.clone();
        this.size = size.clone();
        this.sprites = sprites;
		this.hitbox = hitbox;
	}

	testState(delta,newPos, entities){
		let nextPos = this.pos.sumClone(this.vel.scaleClone(delta))
		let colision = false;
		
		console.log(this)
		console.log(entities[1])

		for (const entity of entities) {
            colision = colision || this.hitbox.testColision(nextPos, entity.hitbox);
        };

		return colision;

	}
	
	update(delta)
	{	

		this.pos.sum(this.vel.scaleClone(delta));
		this.sprites.update(delta);
		this.hitbox.update(delta, this.pos);
	}
	
	draw(ctx)
	{
		this.sprites.draw(ctx, this.pos);
		this.hitbox.draw(ctx);
	}

}