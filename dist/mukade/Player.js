class Node 
{
	constructor(pos, size, normal, iniclock)
	{
		this.pos = pos.clone();	
		this.size = size;
		this.normal = normal.clone()
		this.normal.normalize();
		
		this.lrib = new Vector(-size);
		this.rrib = new Vector(size);
		
		this.clock = iniclock;
					 
	}
	
	update(delta)
	{
		this.clock += delta;
	}
	
	draw(ctx)
	{
		ctx.fillStyle = 'RGB(255,255,255)';
		ctx.strokeStyle = 'RGB(255,255,255)';
		ctx.beginPath();
		
		ctx.moveTo(this.pos.x + this.lrib.x, this.pos.y + this.lrib.y);
		
		ctx.lineTo(this.pos.x + this.rrib.x, this.pos.y + this.rrib.y);
		
		ctx.closePath();
		ctx.stroke();
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.pos.x + 10 * this.normal.x, this.pos.y + 10 * this.normal.y);
		ctx.stroke();
		ctx.closePath();
		
	}
	
	faceTo(target, vel)
	{
		
		this.normal = target.clone();
		this.normal.translate(-this.pos.x, -this.pos.y)
		this.normal.normalize();
		
		this.lrib.x = -this.normal.y * this.size;
		this.lrib.y = this.normal.x * this.size;
		this.rrib.x = this.normal.y * this.size;
		this.rrib.y = -this.normal.x * this.size;
		
		// let deg = this.clock * vel/this.size
		
		// deg = Math.floor(deg * 180 / Math.PI)
		// deg = deg % 360
		// //console.log(deg)
		// let offset = this.normal.dot(new Vector(1,0))/this.normal.magnitude()
		
		// if (deg < 90)
		// {
			// this.lrib.rotate(deg * Math.PI/180 - Math.PI/4)
			// this.rrib.rotate(deg * Math.PI/180 - Math.PI/4)
		// }
		// else if(deg < 180)
		// {
			// this.lrib.rotate(-deg * Math.PI/180 - Math.PI/4)
			// this.rrib.rotate(-deg * Math.PI/180 - Math.PI/4)
		// }
		// else if(deg < 270)
		// {
			// this.lrib.rotate(deg * Math.PI/180 - Math.PI/4)
			// this.rrib.rotate(deg * Math.PI/180 - Math.PI/4)
		// }
		// else 
		// {
			// this.lrib.rotate(-deg * Math.PI/180 - Math.PI/4)
			// this.rrib.rotate(-deg * Math.PI/180 - Math.PI/4)
		// }
		// this.lrib.translate(1*this.normal.x  * Math.cos(this.clock*vel/this.size),1*this.normal.y * vel * Math.cos(this.clock * vel/this.size))
		// this.rrib.translate(1*this.normal.x  * (-Math.cos(this.clock*vel*0.5)),1*this.normal.y * vel * (-Math.cos(this.clock * vel*0.5)))
	
	}
	
	move(vel, target)
	{
		if (this.pos.distance(target) > 2 * this.size)
		{	
			this.pos.translate(this.normal.x * vel, this.normal.y * vel)
		}
	}
}	

class Player
{
	constructor(pos, dir, iniSize, thick, inivel){
		this.pos = pos.clone();
		this.dir = dir.clone();
		this.thick = thick;
		this.vel = inivel;
		this.basevel = inivel;
		this.dir.normalize();
		
		
		this.nodes = [];
		
		this.nodes.push(new Node(pos, thick, dir,0));
		for (let i = 1; i < iniSize; i++)
		{
			this.nodes.push(new Node(new Vector(pos.x - this.dir.x * i * 2 * thick, pos.y -  this.dir.y * i * 2 * thick), thick, this.nodes[i-1].pos.transClone(-pos.x, -pos.y - i * 2 * thick), i*0.5));
		}
	}
	
	update(target, delta)
	{
		this.vel = this.basevel / (Math.sqrt(this.nodes.length)*delta);
		
		this.faceTo(target)
		this.move(target)
		
		this.nodes[0].update(delta);
		for (let i = this.nodes.length - 1; i > 0; i--)
		{
			this.nodes[i].update(delta);
			this.nodes[i].faceTo(this.nodes[i-1].pos, this.vel);
		}
	}
	
	draw(ctx)
	{
		
		this.nodes.forEach(node=>
		{
			node.draw(ctx);
		});
	}
	
	faceTo(target)
	{	
		this.dir = target.sumClone(this.pos.scaleClone(-1));
		this.dir.normalize();
		this.nodes[0].faceTo(target, this.vel);
	}
	
	move(target)
	{
		if (this.pos.distance(target) > 2*this.thick)
		{
			this.pos.translate(this.dir.x * this.vel, this.dir.y * this.vel)
		}
		
		this.nodes[0].move(this.vel, target);
		for (let i = 1; i < this.nodes.length; i++)
		{
			this.nodes[i].move(this.vel, this.nodes[i-1].pos);
		}
	}
	
	enlarge()
	{
		this.nodes.push(new Node(new Vector(this.nodes[this.nodes.length - 1].pos.x, 
											this.nodes[this.nodes.length - 1].pos.y), 
											this.nodes[this.nodes.length - 1].size, 
											new Vector(0,-1), this.nodes[this.nodes.length-1].clock+0.5));
		//console.log(this.nodes[this.nodes.length - 1],this.nodes[this.nodes.length - 2])		
	}
}