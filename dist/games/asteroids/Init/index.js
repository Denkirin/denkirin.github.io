const timeFactor = 1/100;

let canvas;
let ctx;
let player;

let obstacles;

let dir = 1;

let lft = false;
let rgt = false;
let fwd = false;
let sht = false;

let pulsing;

window.onload = init;

class Particle
{
	constructor(x,y)
	{
		this.x = (2*Math.random()-1) * 10 * innerWidth;
		this.y = (2*Math.random()-1) * 10 * innerHeight;
		this.z = Math.random() * innerHeight;
		this.px = x;
		this.py = y;
	}
	
	update(delta)
	{
		this.z -= delta;
	
		if (this.z <= 0)
		{
			this.x = Math.random() * innerWidth;
			this.y = Math.random() * innerHeight;
			this.z = Math.random() * innerHeight;
		}
		
	}
	
	draw(ctx)
	{
		if(this.z< innerHeight/4)
		{
			ctx.fillStyle = 'white';
			ctx.fillRect(innerWidth/2 + this.x/this.z ,innerHeight/2 + this.y/this.z,2,2);
			ctx.fill();
		}
	}
}

let particles = [];

function init(){
	canvas = document.querySelector('canvas');
	
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	
	ctx = canvas.getContext('2d');

	oldTimestamp = 0;
	
	for (let i = 0; i < 100; i++) {
		particles.push(new Particle());
	}
	// Start the first frame request
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp){
	
	if (oldTimestamp == 0) oldTimestamp = timeStamp;
	
	const delta = (timeStamp - oldTimestamp) * timeFactor;
		
	pulsing = 200 + 55*Math.cos(timeStamp/500);
		
	update(delta);
	
	particles.forEach((particle)=>
	{
		particle.update(delta);
	});
	
	draw();

	// Keep requesting new frames
	
	oldTimestamp = timeStamp;
	
	window.requestAnimationFrame(gameLoop);
}

function update(delta){
	

}

function draw(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	particles.forEach((particle)=>
	{
		particle.draw(ctx);
	});

	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'white'
	
	ctx.font = canvas.height * 0.2 + 'px impact';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle'; 
 
    ctx.fillText('CELESTIAL', canvas.width/2, canvas.height * 0.2, canvas.width);
    ctx.fillText('BODIES', canvas.width/2, canvas.height * 0.4, canvas.width);
	
	
	ctx.fillStyle = 'rgba('+pulsing+', '+pulsing+', '+pulsing+', 1)'
	
	ctx.font = canvas.height * 0.05 + 'px impact';
    ctx.fillText('PRESS START', canvas.width/2, canvas.height * 0.8, canvas.width);
    // ctx.fillText('BODIES', canvas.width/2, canvas.height * 0.9);
}

addEventListener('keydown',() => {
	
	if (event.keyCode == 90)
	{
		fwd = true;
	}
	
	if (event.keyCode == 37)
	{
		lft = true;
	}
	
	if (event.keyCode == 39)
	{
		rgt = true;
	}

	if (event.keyCode == 88)
	{
		document.location.href = './../Game/index.html';
	}

})

addEventListener('keyup',() => {
	
	if (event.keyCode == 90)
	{
		fwd = false;
	}
	
	if (event.keyCode == 37)
	{
		lft = false;
	}

	if (event.keyCode == 39)
	{
		rgt = false;
	}
	
	if (event.keyCode == 88)
	{
		sht = false;
	}

})