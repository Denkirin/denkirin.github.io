import { Projectile } from "./Projectile.js";
import { Vector } from "../../../../engine/utils/geometry.js";

export class Player
{
	constructor(pos, stateManager)
	{
		this.pos = pos;
		this.guard = 'mid'; //0 - low, 1 - mid, 2 - hig
		this.stateManager = stateManager;
		this.direction = 1;

		this.state = 'idle';
	}
	
	update(delta)
	{
		
		this.stateManager.update(delta);
		
	}
	
	draw(ctx, offX, offY)
	{
		this.stateManager.draw(ctx, this.pos);

	}

	testState(delta, newPos, otherEntities){

		return(true);

	}

	changeGuard(guard){
		this.guard = guard;
	}
}