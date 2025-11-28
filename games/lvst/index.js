
import * as engine from '../../../engine/bin/game.js'
import { Sprite } from '../../engine/utils/sprite.js';
import * as entities from './entities/loader.js'
import { Vector } from '../../engine/utils/geometry.js';
import { Hitbox } from '../../engine/utils/hitbox.js';
import { HitboxManager } from '../../engine/utils/hitboxManager.js';
import { StateManager } from '../../engine/utils/stateManager.js';


let lft = false;
let rgt = false;
let fwd = false;
let sht = false;

let shotCount = 0;

viewport = document.getElementById('Viewport');
let game = new engine.Game(viewport, innerWidth, innerHeight);

let playerIdle = new Sprite('./src/spritesheet.png', new Vector(0, 0), 0, 0, 64, 64, 1, 1)
let playerDefDown = new Sprite('./src/spritesheet.png', new Vector(0, 0), 64, 0, 64, 64, 1, 1)
let playerDefUp = new Sprite('./src/spritesheet.png', new Vector(0, 0), 128, 0, 64, 64, 1, 1)
let playerAttMid = new Sprite('./src/spritesheet.png', new Vector(0, 0), 0, 64, 64, 64, 1, 1)
let playerAttUp = new Sprite('./src/spritesheet.png', new Vector(0, 0), 64, 64, 64, 64, 1, 1)
let playerAttDown = new Sprite('./src/spritesheet.png', new Vector(0, 0), 128, 64, 64, 64, 1, 1)

let playerBoxes = new Hitbox(new Vector(0, 0), new Vector(64*4, 64*4),true);
let playerHitboxes = new HitboxManager([playerBoxes])

let sprites1 = {'idle' : playerIdle,
				'defD' : playerDefDown,
				'defU' : playerDefUp,
				'attM' : playerAttMid,
				'attU' : playerAttUp,
				'attD' : playerAttDown
				};

let hitboxes1 = {
				'idle' : playerHitboxes,
				'defD' : playerHitboxes,
				'defU' : playerHitboxes,
				'attM' : playerHitboxes,
				'attU' : playerHitboxes,
				'attD' : playerHitboxes
				};

let playerManager = new StateManager(sprites1, hitboxes1);

let player = new entities.Player(new Vector(0,0), playerManager);
let enemy = new entities.Player(new Vector(innerWidth/2, 0), playerManager);

enemy.direction = -1

game.add_entity(player);
game.add_entity(enemy);

window.onload = ()=>game.init();

addEventListener('keydown',() => {
	
	if (event.keyCode == 38)
	{
		player.stateManager.changeState('defU');
		player.changeGuard('up');
	}
	
	if (event.keyCode == 40)
	{
		player.stateManager.changeState('defD');
		player.changeGuard('down');

	}
	
	if (event.keyCode == 65)
	{
		switch (player.guard){
			case 'up':
				player.stateManager.changeState('attU');
				break;
			case 'down':
				player.stateManager.changeState('attD');
				break;
			default:
				player.stateManager.changeState('attM');
				break;

		}
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
	
	if (event.keyCode == 38)
	{
		player.stateManager.changeState('idle');
		player.changeGuard('mid');
	}
	
	if (event.keyCode == 40)
	{
		player.stateManager.changeState('idle');
		player.changeGuard('mid');
	}

	if (event.keyCode == 65)
	{
		switch (player.guard){
			case 'up':
				player.stateManager.changeState('defU');
				break;
			case 'down':
				player.stateManager.changeState('defD');
				break;
			default:
				player.stateManager.changeState('idle');
				break;

		}
	}
	
	if (event.keyCode == 88)
	{
		player.sht = false;
	}

})