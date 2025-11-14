export class Entity
{
	constructor(pos, vel, size){
		this.pos = pos.clone();
        this.vel = vel.clone();
        this.size = size.clone();
        
	}
	
	update(delta)
	{
		this.pos.sum(this.vel.scaleClone(delta));
	}
	
	draw(ctx)
	{
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y)
	}

}