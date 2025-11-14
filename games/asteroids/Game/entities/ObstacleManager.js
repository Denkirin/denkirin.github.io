import { Obstacle } from "./Obstacle.js";
import { Oscillator } from "../../../../engine/utils/sound.js";
import { Vector } from "../../../../engine/utils/geometry.js";

export class ObstacleManager{
    constructor(n_obstacles, size, player_ref){
        this.player_ref = player_ref
        this.obstacles = []
        for (let i = 0; i < n_obstacles; i++){
            this.obstacles.push(new Obstacle(new Vector(Math.random() * 500,Math.random() * 500),new Vector(Math.random() * 0.2 - 0.1,Math.random() * 0.2 - 0.1),size))
        }

        this.osci = new Oscillator();

    }

    update(delta){

        for (const obs of this.obstacles) {
            obs.update(delta);
        };

        
        this.obstacles.forEach((obstacle)=>
        {
            
            if(this.player_ref.pos.modDistance(obstacle.pos, innerWidth, innerHeight) - 10 <= obstacle.weight)
            {
                this.player_ref.kill();
                if (this.player_ref.deathCounter == 0)
                {
                    this.osci.destroy();
                }
            }
            
            this.player_ref.projectiles.forEach((projectile)=>
            {
                if (projectile.alive && projectile.pos.modDistance(obstacle.pos, innerWidth, innerHeight) <= obstacle.weight)
                {
                    this.player_ref.score += 100 - obstacle.weight
                    this.osci.destroy()
                    
                    projectile.kill();
                    
                    this.obstacles.push(obstacle.kill(projectile.pos));
                
                    if (obstacle.dead)
                    {
                        this.osci.success();
                    }
                }
            });
        });
        
        this.obstacles = this.obstacles.filter((obs) => !obs.dead);
        
    }


    draw(ctx){
        for (const obs of this.obstacles) {
            obs.draw(ctx);
        };
    }
}