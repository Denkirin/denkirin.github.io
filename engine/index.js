import {Game} from './bin/game.js'
import {Entity} from './bin/entity.js'
import { Vector } from './dependencies.js';
import { Sprite } from './utils/sprite.js';
import { Hitbox } from './utils/hitbox.js';
import { StateManager } from './utils/stateManager.js';
import { HitboxManager } from './utils/hitboxManager.js';

viewport = document.getElementById('Viewport');
let g = new Game(viewport, innerWidth, innerHeight);

let s1 = new Sprite('./src/spritesheet.png', new Vector(0, 0), 0, 904, 260, 96, 4, 1)
let h1 = new Hitbox(new Vector(0, 0), new Vector(64*4, 95*4),true);
let hm1 = new HitboxManager([h1, h1, h1, h1])

let sprites1 = {'idle' : s1};
let hitboxes1 = {'idle' : hm1};

let m1 = new StateManager(sprites1, hitboxes1);

let e1 = new Entity(new Vector(0, 0), new Vector(1, 1) ,new Vector(10, 10), m1)

let s2 = new Sprite('./src/spritesheet.png', new Vector(400, 400), 0, 904, 260, 96, 4, 1)
let h2 = new Hitbox(new Vector(400, 400), new Vector(64*4, 95*4),true);
let hm2 = new HitboxManager([h2, h2, h2, h2])

let sprites2 = {'idle' : s2};
let hitboxes2 = {'idle' : hm2};

let m2 = new StateManager(sprites2, hitboxes2);

let e2 = new Entity(new Vector(400, 400), new Vector(-1, -1) ,new Vector(10, 10), m2)

/*
let s2 = new Sprite('./src/spritesheet.png', 0, 904, 260, 96, 4, 1)
let h2 = new Hitbox(new Vector(400, 400), new Vector(64*4, 95*4),true);
let e2 = new Entity(new Vector(400, 400), new Vector(-1, -1) ,new Vector(10, 10), s2, h2)
*/

g.add_entity(e1)
g.add_entity(e2)

window.onload = ()=>g.init();