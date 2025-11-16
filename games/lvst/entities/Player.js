import { Projectile } from "./Projectile.js";
import { Vector } from "../../../../engine/utils/geometry.js";

export class Player
{
	constructor(pos, stateManager)
	{
		this.pos = pos;
		this.guard = 1; //0 - low, 1 - mid, 2 - hig
		this.stateManager = stateManager;

		this.state = 'idle';
	}
	
	update(delta)
	{
		
		this.stateManager.update(delta);
		
	}
	
	draw(ctx, offX, offY)
	{

		this.stateManager.update(delta);

	}
}