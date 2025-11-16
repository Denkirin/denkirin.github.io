
import * as engine from '../../../engine/bin/game.js'
import * as entities from './entities/loader.js'


let lft = false;
let rgt = false;
let fwd = false;
let sht = false;

let shotCount = 0;

viewport = document.getElementById('Viewport');
let game = new engine.Game(viewport, innerWidth, innerHeight);

let player = new entities.Player(innerWidth/2, innerHeight/2, 20);
let obsManager = new entities.ObstacleManager(1,100,player)

game.add_entity(player)
game.add_entity(obsManager);

window.onload = ()=>game.init();


function draw(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	player.draw(ctx);
	obstacles.forEach((obstacle)=>
	{
		obstacle.draw(ctx);
	});
	
	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'white'
	
	ctx.font = canvas.height * 0.02 + 'px impact';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle'; 
 
    ctx.fillText(Math.floor(score), canvas.width/2, canvas.height * 0.2, canvas.width);
	
}

addEventListener('keydown',() => {
	
	if (event.keyCode == 90)
	{
		player.fwd = true;
	}
	
	if (event.keyCode == 37)
	{
		player.lft = true;
	}
	
	if (event.keyCode == 39)
	{
		player.rgt = true;
	}

	if (event.keyCode == 88)
	{
		if (!player.sht)
		{
			player.shoot();
			
			obsManager.osci.shot();
			player.sht = true;
		}
	}

})

addEventListener('keyup',() => {
	
	if (event.keyCode == 90)
	{
		player.fwd = false;
	}
	
	if (event.keyCode == 37)
	{
		player.lft = false;
	}

	if (event.keyCode == 39)
	{
		player.rgt = false;
	}
	
	if (event.keyCode == 88)
	{
		player.sht = false;
	}

})