export class Projectile
{
	constructor(pos, dir, speed)
	{
		this.pos = pos.clone();
		this.dir = dir.clone();
		this.dir.normalize();
		this.alive = true;
		this.speed = speed;
		this.deathCounter = 0;
		this.dying = false;
		
	}
	
	shoot(pos, dir, speed)
	{
		this.pos = pos.clone();
		this.dir = dir.clone();
		this.dir.normalize();
		this.alive = true;
		this.dying = false;
		this.speed = speed;
		this.deathCounter = 0;
	}
	
	kill()
	{
		this.dying = true;
		this.alive = false;
	}

	update(delta)
	{
		if (this.alive)
		{
			const aux = this.dir.clone();
			aux.scale(delta);
			aux.scale(this.speed);
			this.pos.sum(aux);
			
			if(this.pos.x < 0 || this.pos.x > innerWidth || this.pos.y < 0 || this.pos.y > innerHeight)
			{
				this.alive = false;
			}
		}
		// console.log(this.dying)
		if(this.dying)
		{
			const aux = this.dir.clone();
			aux.scale(delta);
			aux.scale(this.speed * 0.1);
			this.pos.sum(aux);
			
			// console.log("AAA");
			this.deathCounter++;
			if(this.deathCounter > 10)
			{
				// console.log("AAA");
				this.dying = false;
				this.deathCounter = 0;
			}
		}
		return(this.alive || this.dying);
	}
	
	draw(ctx)
	{
		if (this.alive)
		{
			const aux = this.dir.clone();
			aux.scale(10);
			aux.sum(this.pos);
			
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(this.pos.x, this.pos.y);
			ctx.lineTo(aux.x, aux.y );
			ctx.stroke();
		}
		
		if(this.dying)
		{
			const difactor = Math.cos(Math.PI/4)
			
			// console.log(this.deathCounter);
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(this.pos.x, this.pos.y - this.deathCounter/5);
			ctx.lineTo(this.pos.x, this.pos.y - this.deathCounter);
			ctx.moveTo(this.pos.x, this.pos.y + this.deathCounter/5);
			ctx.lineTo(this.pos.x, this.pos.y + this.deathCounter);
			ctx.moveTo(this.pos.x - this.deathCounter/5, this.pos.y);
			ctx.lineTo(this.pos.x - this.deathCounter, this.pos.y);
			ctx.moveTo(this.pos.x + this.deathCounter/5, this.pos.y);
			ctx.lineTo(this.pos.x + this.deathCounter, this.pos.y);
			
			
			ctx.moveTo(this.pos.x - this.deathCounter/5 * difactor, this.pos.y - this.deathCounter/5) * difactor;
			ctx.lineTo(this.pos.x - this.deathCounter * difactor, this.pos.y - this.deathCounter * difactor);
			ctx.moveTo(this.pos.x - this.deathCounter/5 * difactor, this.pos.y + this.deathCounter/5) * difactor;
			ctx.lineTo(this.pos.x - this.deathCounter * difactor, this.pos.y + this.deathCounter * difactor);
			ctx.moveTo(this.pos.x + this.deathCounter/5 * difactor, this.pos.y + this.deathCounter/5) * difactor;
			ctx.lineTo(this.pos.x + this.deathCounter * difactor, this.pos.y + this.deathCounter * difactor);
			ctx.moveTo(this.pos.x + this.deathCounter/5 * difactor, this.pos.y - this.deathCounter/5) * difactor;
			ctx.lineTo(this.pos.x + this.deathCounter * difactor, this.pos.y - this.deathCounter * difactor);
			
			ctx.stroke();
		}
	}
}