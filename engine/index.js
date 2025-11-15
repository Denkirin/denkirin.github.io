import {Game} from './bin/game.js'
import {Entity} from './bin/entity.js'
import { Vector } from './dependencies.js';
import { SpriteManager } from './utils/spriteManager.js';
import { Hitbox } from './utils/hitbox.js';

viewport = document.getElementById('Viewport');
let g = new Game(viewport, innerWidth, innerHeight);

let s1 = new SpriteManager('./src/spritesheet.png', 0, 904, 260, 96, 4, 1)
let h1 = new Hitbox(new Vector(0, 0), new Vector(64*4, 95*4),true);
let e1 = new Entity(new Vector(0, 0), new Vector(1, 1) ,new Vector(10, 10), s1, h1)


let s2 = new SpriteManager('./src/spritesheet.png', 0, 904, 260, 96, 4, 1)
let h2 = new Hitbox(new Vector(400, 400), new Vector(64*4, 95*4),true);
let e2 = new Entity(new Vector(400, 400), new Vector(-1, -1) ,new Vector(10, 10), s2, h2)

g.add_entity(e1)
g.add_entity(e2)

window.onload = ()=>g.init();