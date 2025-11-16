
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
let playerDefUp = new Sprite('./src/spritesheet.png', new Vector(0, 0), 0, 128, 64, 64, 1, 1)
let playerAttMid = new Sprite('./src/spritesheet.png', new Vector(0, 0), 64, 0, 64, 64, 1, 1)
let playerAttUp = new Sprite('./src/spritesheet.png', new Vector(0, 0), 64, 64, 64, 64, 1, 1)
let playerAttDown = new Sprite('./src/spritesheet.png', new Vector(0, 0), 64, 128, 64, 64, 1, 1)

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

let player = new entities.Player(new Vector(innerWidth/2, innerHeight/2),);

game.add_entity(player)

window.onload = ()=>game.init();

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