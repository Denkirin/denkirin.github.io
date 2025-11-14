const timeFactor = 1 / 100;

let canvas;
let ctx;
let player;
let enemy;
let coreTarget = new Vector(200, 200);

let dir = 0;

let oldTimestamp = 0;

let up = false;
let down = false;
let left = false;
let right = false;
let split = false;

let pause = true;

let score = 0;

let spritesheet;

let food = [];
let foodLimit = 10
let bound;

window.onload = init;

spriteData =
{
	"MUKADE": { "x": 1, "y": 1, "w": 124, "h": 20 },
	"ScoreText": { "x": 1, "y": 35, "w": 58, "h": 10 },
	1: { "x": 2, "y": 23, "w": 10, "h": 10 },
	2: { "x": 14, "y": 23, "w": 10, "h": 10 },
	3: { "x": 26, "y": 23, "w": 10, "h": 10 },
	4: { "x": 38, "y": 23, "w": 10, "h": 10 },
	5: { "x": 50, "y": 23, "w": 10, "h": 10 },
	6: { "x": 62, "y": 23, "w": 10, "h": 10 },
	7: { "x": 74, "y": 23, "w": 10, "h": 10 },
	8: { "x": 86, "y": 23, "w": 10, "h": 10 },
	9: { "x": 98, "y": 23, "w": 10, "h": 10 },
	0: { "x": 110, "y": 23, "w": 10, "h": 10 },
}

function init() {
	canvas = document.getElementById('Viewport');

	canvas.width = innerWidth;
	canvas.height = innerHeight;

	bound = canvas.height * 0.1;

	spritesheet = document.getElementById("spritesheet");

	ctx = canvas.getContext('2d');

	player = new Player(new Vector(canvas.width / 2, canvas.height / 3 + bound), new Vector(0, 1), 0, 10, 1)
	enemy = new Player(new Vector(canvas.width / 2, 2 * canvas.height / 3 + bound), new Vector(0, -1), 0, 10, 1)

	for (let i = 0; i < foodLimit; i++) {
		food.push(new Vector(Math.random() * canvas.width, Math.random() * (canvas.height - bound) + bound))
	}

	// Start the first frame request
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {

	if (oldTimestamp == 0) oldTimestamp = timeStamp - 0.1;

	const delta = (timeStamp - oldTimestamp) * timeFactor;

	if (!pause) {
		update(delta);
	}
	draw();

	// Keep requesting new frames

	oldTimestamp = timeStamp;

	window.requestAnimationFrame(gameLoop);
}

function removeDead(obstacle) {
	return (!obstacle.dead);
}


function update(delta) {
	enemy.update(food[0], delta)

	player.update(coreTarget, delta)

	food.forEach(f => {
		if (f.distance(enemy.pos) <= 20) {
			enemy.enlarge();
			f.x = Math.random() * canvas.width
			f.y = Math.random() * (canvas.height - bound) + bound
		}

		if (f.distance(player.pos) <= 20) {
			player.enlarge();
			f.x = Math.random() * canvas.width
			f.y = Math.random() * (canvas.height - bound) + bound
			score += 100;
		}
	});

	let pcnt = 0;
	let ecnt = 0;

	if (enemy.nodes[0].pos.distance(player.pos) <= 20) {
		for (let i = 1; i < enemy.nodes.length; i++) {
			enemy.nodes.pop();
		}

		for (let i = 1; i < player.nodes.length; i++) {
			player.nodes.pop();
		}

		score = Math.max(0, score - 1000);
	}
	else {
		for (let i = 0; i < enemy.nodes.length; i++) {
			if (enemy.nodes[i].pos.distance(player.pos) <= 20) {
				pcnt = enemy.nodes.length - i;
				break;
			}
		}

		for (let i = 0; i < player.nodes.length; i++) {
			if (player.nodes[i].pos.distance(enemy.pos) <= 20) {
				ecnt = player.nodes.length - i;
				break;
			}
		}

		for (let i = 0; i < pcnt; i++) {
			if (enemy.nodes.length > 1) {
				enemy.nodes.pop()
				player.enlarge()
				score += 100;
			}
		}
		for (let i = 0; i < ecnt; i++) {
			if (enemy.nodes.length > 1) {
				player.nodes.pop()
				enemy.enlarge()
				score -= 100;
			}
		}
	}


	if (up && coreTarget.y > bound) {
		coreTarget.translate(0, -10);
	}
	if (down && coreTarget.y < innerHeight - 10) {
		coreTarget.translate(0, 10);
	}
	if (left && coreTarget.x > 10) {
		coreTarget.translate(-10, 0);
	}
	if (right && coreTarget.x < innerWidth - 10) {
		coreTarget.translate(10, 0);
	}

	if (split) {
		for (let i = 1; i < player.nodes.length / 2; i++) {
			food.push(player.nodes[player.nodes.length - 1].pos.clone())
			player.nodes.pop();
		}
		split = false;
	}

}

function draw() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	let scale = canvas.height * 0.05 / spriteData["MUKADE"].h
	let scoreArr = splitNumber(score);
	let sbasex = canvas.width - 3 * spriteData["ScoreText"].w * scale;
	let sbasey = canvas.height * 0.025 + spriteData["ScoreText"].h * scale / 2;
	let mbasex = 50
	let mbasey = bound / 2 - spriteData["MUKADE"].h * scale / 2

	console.log(scoreArr)

	if (canvas.width < (spriteData["MUKADE"].w + 4 * spriteData["ScoreText"].w) * scale) {
		bound = scale * (spriteData["MUKADE"].h + spriteData["ScoreText"].h + 2) + 20
		sbasex = canvas.width / 2 - scale * (spriteData["ScoreText"].w + 2 + 8 * spriteData[0].w) / 2;
		sbasey = 10 + (spriteData["MUKADE"].h + 2) * scale;
		mbasex = canvas.width / 2 - scale * (spriteData["MUKADE"].w) / 2;
		mbasey = 10;
	}

	ctx.drawImage(spritesheet, spriteData["MUKADE"].x, spriteData["MUKADE"].y, spriteData["MUKADE"].w, spriteData["MUKADE"].h, mbasex, mbasey, spriteData["MUKADE"].w * scale, spriteData["MUKADE"].h * scale);

	ctx.drawImage(spritesheet, spriteData["ScoreText"].x, spriteData["ScoreText"].y, spriteData["ScoreText"].w, spriteData["ScoreText"].h, sbasex, sbasey, spriteData["ScoreText"].w * scale, spriteData["ScoreText"].h * scale);



	for (let i = 0; i < 8; i++) {
		if (scoreArr.length - 1 < i) {
			ctx.drawImage(spritesheet, spriteData[0].x, spriteData[0].y, spriteData[0].w, spriteData[0].h, sbasex + scale * (spriteData["ScoreText"].w + 2 + spriteData[0].w * (7 - i)), sbasey, spriteData[0].w * scale, spriteData[0].h * scale);
		}
		else {
			ctx.drawImage(spritesheet, spriteData[scoreArr[i]].x, spriteData[scoreArr[i]].y, spriteData[scoreArr[i]].w, spriteData[scoreArr[i]].h, sbasex + scale * (spriteData["ScoreText"].w + 2 + spriteData[scoreArr[i]].w * (7 - i)), sbasey, spriteData[scoreArr[i]].w * scale, spriteData[scoreArr[i]].h * scale);
		}
	}

	ctx.strokeStyle = 'rgb(255,255,255)'
	ctx.strokeRect(5, 5, canvas.width - 10, bound - 10)

	ctx.fillStyle = 'red';
	ctx.fillRect(coreTarget.x, coreTarget.y, 5, 5);
	player.draw(ctx)
	enemy.draw(ctx)

	food.forEach(f => {
		ctx.fillStyle = 'green';
		ctx.fillRect(f.x, f.y, 5, 5);
	});
	player.draw(ctx)
	enemy.draw(ctx)
}

addEventListener('keydown', () => {

	if (event.keyCode == 38) {
		up = true
	}

	if (event.keyCode == 37) {
		left = true
	}

	if (event.keyCode == 39) {
		right = true
	}

	if (event.keyCode == 40) {
		down = true
	}

	if (event.keyCode == 32) {
		split = true
	}

	if (event.keyCode == 13) {
		pause = !pause;
	}
	else {
		pause = false;
	}

})

addEventListener('keyup', () => {

	if (event.keyCode == 38) {
		up = false
	}

	if (event.keyCode == 37) {
		left = false
	}

	if (event.keyCode == 39) {
		right = false
	}

	if (event.keyCode == 40) {
		down = false
	}

})

addEventListener('touchstart', () => {

	coreTarget.x = event.touches[0].pageX;
	coreTarget.y = Math.max(event.touches[0].pageY, bound);
	pause = false;

})

addEventListener('touchmove', () => {

	coreTarget.x = event.touches[0].pageX;
	coreTarget.y = Math.max(event.touches[0].pageY, bound);

})

addEventListener('touchend', () => {
	// FIX THIS

	sht = false;
	fwd = false;
	lft = false;
	rgt = false;

})