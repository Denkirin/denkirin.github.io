import { Projectile } from "./Projectile.js";
import { Vector } from "../../../../engine/utils/geometry.js";

export class Player
{
	constructor(x, y, size)
	{
		this.pos = new Vector(x, y);		
		
		this.dots = 
		[
			new Vector(x, y - size/2),
			new Vector(x - size/2, y + size/2),
			new Vector(x + size/2, y + size/2)
		]
		
		this.acc = new Vector(0,0);
		
		this.rot = 0;
		this.dir = new Vector(0, -1);
		
		this.projectiles = [];
		
		this.rx = 0;
		this.ry = 0;
		this.lx = 0;
		this.ly = 0;
		this.dead = false;
		this.deathCounter = 0;
		this.coliding = false;

		this.lft = false;
		this.rgt = false;
		this.fwd = false;
		this.sht = false;

		this.score = 0;
	}
	
	kill()
	{
		if (this.deathCounter == 0)
		{
			this.deathCounter = 1;
		}
	}
	
	isAlive(projectile)
	{
		return(projectile.alive || projectile.dying);
	}
	
	shoot()
	{
		this.projectiles.push(new Projectile(this.pos, this.dir, 50));
		// console.log(this.projectiles.length);
	}
	
	rotate(deg)
	{
		this.rot += deg;
		
		this.dots.forEach((dot) =>
		{
			dot.rotatePivot(deg,this.pos);
		});
		
		this.dir.rotate(deg);
	}
	
	forward(dis)
	{
		var vdis = this.dir.clone();
		vdis.scale(dis)
		
		this.acc.sum(vdis);
		
	}

	testState(delta, pos, entities){
		return(false);
	}
	
	update(delta)
	{
		if (this.lft)
		{
			this.rotate(-0.1);
		}
		
		if (this.rgt)
		{
			this.rotate(0.1);
		}
		
		if (this.fwd)
		{
			this.forward(2);
		}
		
		if (this.dead){
			document.location.href = './../Init/index.html';
		}

		const aux = this.acc.clone();
		aux.scale(delta);
		
		this.pos.translate(aux.x, aux.y);
		
		this.dots.forEach((dot) =>
		{
			dot.translate(aux.x, aux.y);
		});
		
		this.acc.scale(0.9);
		
		let alive = true;
		
		this.projectiles.forEach((projectile) =>
		{
			projectile.update(delta);
		});
		
		this.projectiles = this.projectiles.filter(this.isAlive);
		
		
		this.rx = 0;
		this.ry = 0;
		this.lx = 0;
		this.ly = 0;
		
		this.dots.forEach((dot)=>
		{
			this.rx += (dot.x > innerWidth  ? 1 : 0);
			this.ry += (dot.y > innerHeight ? 1 : 0);
			this.lx += (dot.x < 0 ? 1 : 0);
			this.ly += (dot.y < 0 ? 1 : 0);
		});
		
		if (this.rx >= this.dots.length)
		{
			this.pos.x -= innerWidth;
			this.dots.forEach((dot)=>
			{
				dot.x -= innerWidth;
			});
		}
		else if (this.lx >= this.dots.length)
		{
			this.pos.x += innerWidth;
			this.dots.forEach((dot)=>
			{
				dot.x += innerWidth;
			});
		}
		
		if (this.ry >= this.dots.length)
		{
			this.pos.y -= innerHeight;
			this.dots.forEach((dot)=>
			{
				dot.y -= innerHeight;
			});
		}
		else if (this.ly >= this.dots.length)
		{
			this.pos.y += innerHeight;
			this.dots.forEach((dot)=>
			{
				dot.y += innerHeight;
			});
		}
		
		
		if (this.deathCounter > 0)
		{
			if (this.deathCounter > 10)
			{
				this.dead = true;
			}
			this.deathCounter++;
		}
		
	}
	
	draw(ctx, offX, offY)
	{

		if (this.deathCounter > 0)
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
		else
		{
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(this.dots[0].x, this.dots[0].y);
			ctx.lineTo(this.dots[1].x, this.dots[1].y);
			ctx.lineTo(this.dots[2].x, this.dots[2].y);
			ctx.lineTo(this.dots[0].x, this.dots[0].y);
			ctx.stroke();
		
			if(this.rx || this.ry || this.lx || this.ly)
			{
				let offX = 0;
				let offY = 0;
				
				if(this.rx > 0)
				{
					offX = -innerWidth;
				}
				else if (this.lx > 0)
				{
					offX = innerWidth;
				}
				
				if(this.ry > 0)
				{
					offY = -innerHeight;
				}
				else if (this.ly > 0)
				{
					offY = innerHeight;
				}
				
				ctx.beginPath();
				ctx.moveTo(this.dots[0].x + offX, this.dots[0].y + offY);
				ctx.lineTo(this.dots[1].x + offX, this.dots[1].y + offY);
				ctx.lineTo(this.dots[2].x + offX, this.dots[2].y + offY);
				ctx.lineTo(this.dots[0].x + offX, this.dots[0].y + offY);
				ctx.stroke();
			}
		}
		this.projectiles.forEach((projectile) =>
		{
			projectile.draw(ctx);
		});
		
	}

	colide(){
		
	}
}