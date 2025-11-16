import {Hitbox} from '../../../../engine/utils/hitbox.js'

export class Obstacle
{
	constructor(pos, dir, weight)
	{
		this.pos = pos;
		this.dir = dir;
		this.weight = weight;
		
		this.dir.normalize();
		this.dead = false; 
		this.coliding = false;
		this.hitbox = new Hitbox(pos, 10)
	}
	
	kill(dir)
	{
		if (this.weight > 10)
		{
			let aux = dir.clone();
			let opos = this.pos.clone();
			
			aux.scale(-1);
			aux.sum(this.pos);
			
			aux.ortho();
			aux.scale(this.weight/4);
			
			// this.pos.sum(aux);
			this.dir = aux.clone();
			this.dir.normalize();
			this.weight = this.weight/2;
			
			aux.scale(-1);
			// opos.sum(aux);
			
			return(new Obstacle(opos, aux.clone(), this.weight));
		}
		else
		{
			let copy = new Obstacle(this.pos.clone(), this.dir.clone(), this.weight)
			this.dead = true;
			copy.dead = true;
			
			return(copy);
		}		
	}

	testState(delta, pos, entities){
		return(false);
	}
	
	update(delta)
	{
		const aux = this.dir.clone();
		aux.scale(delta);
		aux.scale(1/this.weight*100);
		this.pos.sum(aux);
		
		if (this.pos.x - this.weight < 0)
		{
			this.pos.x += innerWidth;
		}
		
		if (this.pos.x + this.weight > innerWidth)
		{
			this.pos.x -= innerWidth;
		}
		
		if (this.pos.y - this.weight < 0)
		{
			this.pos.y += innerHeight;
		}
		
		if (this.pos.y + this.weight > innerHeight)
		{
			this.pos.y -= innerHeight;
		}
	}
	
	draw(ctx, offX, offY)
	{
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.weight, 0, 360);
		ctx.stroke();
		
		if (this.pos.x - this.weight < 0)
		{
			ctx.beginPath();
			ctx.arc(this.pos.x + innerWidth, this.pos.y, this.weight, 0, 360);
			ctx.stroke();
		}
		
		if (this.pos.x + this.weight > innerWidth)
		{
			ctx.beginPath();
			ctx.arc(this.pos.x - innerWidth, this.pos.y, this.weight, 0, 360);
			ctx.stroke();
		}
		
		if (this.pos.y - this.weight < 0)
		{
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y + innerHeight, this.weight, 0, 360);
			ctx.stroke();
		}
		
		if (this.pos.y + this.weight > innerHeight)
		{
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y - innerHeight, this.weight, 0, 360);
			ctx.stroke();
		}
	}
}