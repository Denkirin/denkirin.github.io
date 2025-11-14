import {Game} from './bin/game.js'
import {Entity} from './bin/entity.js'
import { Vector } from './bin/dependencies.js';

viewport = document.getElementById('Viewport');
let g = new Game(viewport, innerWidth, innerHeight);

let e = new Entity(new Vector(0, 0), new Vector(0.1, 0.1) ,new Vector(10, 10))

g.add_entity(e)

window.onload = ()=>g.init();