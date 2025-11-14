const timeFactor = 1 / 100;
let canvas;
let ctx;

let dir = 1;
let trans = false;

let p1, p2, p3;

let pulsing;
let pointer;
let textOff = 0;

let stage = 0;
let targetStage;
let offtrans = 0;

let oldTimestamp = 0;

const tabs = ["PROJECTS", "ABOUT ME", "CONTACT"]
const projects = ["ASTEROIDS", "MUKADE"]
const project_refs = ["./games/asteroids/Game/index.html", "./games/mukade/index.html"]
window.onload = init;

class Particle {
	constructor(x, y) {
		this.x = (2 * Math.random() - 1) * 10 * innerWidth;
		this.y = (2 * Math.random() - 1) * 10 * innerHeight;
		this.z = Math.random() * 50;
		this.px = x;
		this.py = y;
	}

	update(delta) {
		this.z -= delta;

		if (this.z <= 0) {
			this.x = (2 * Math.random() - 1) * 10 * innerWidth;
			this.y = (2 * Math.random() - 1) * 10 * innerHeight;
			this.z = Math.random() * 50;
		}

	}

	draw(ctx) {
		if (this.z < innerHeight / 4) {
			ctx.fillStyle = 'white';
			ctx.fillRect(innerWidth / 2 + this.x / this.z, innerHeight / 2 + this.y / this.z, 2, 2);
			ctx.fill();
		}
	}
}

let particles = [];

function init() {
	canvas = document.querySelector('canvas');

	canvas.width = innerWidth;
	canvas.height = innerHeight;

	ctx = canvas.getContext('2d');

	pulsing = 200;

	oldTimestamp = 0;

	pointer = 0;

	for (let i = 0; i < 100; i++) {
		particles.push(new Particle());
	}
	// Start the first frame request
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {

	if (oldTimestamp == 0) oldTimestamp = timeStamp;

	const delta = (timeStamp - oldTimestamp) * timeFactor;



	update(timeStamp);

	particles.forEach((particle) => {
		particle.update(delta);
	});

	draw();

	// Keep requesting new frames

	oldTimestamp = timeStamp;

	window.requestAnimationFrame(gameLoop);
}

function update(timeStamp) {

	pulsing = 200 + 55 * Math.cos(timeStamp / 200);

	p1 = canvas.height * (0.65 + 0.07 * pointer)
	p2 = p1 + canvas.height * 0.025 * Math.cos(timeStamp / 200);
	p3 = p1 + canvas.height * 0.025 * Math.cos(timeStamp / 200 + Math.PI);

	if (textOff > 80) {
		//console.log("CHANGE!");
		document.location.href = './asteroids/Init/index.html';
	}

}

function draw() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	particles.forEach((particle) => {
		particle.draw(ctx);
	});

	if (trans) {
		if (stage != targetStage && offtrans < canvas.height / 2) {
			offtrans += 10;
		}
		else if (offtrans > 0) {
			stage = targetStage
			offtrans -= 10;
		}
	}

	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'white'


	ctx.font = canvas.height * 0.05 + 'px impact';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.fillText("Pau Pamos", canvas.width / 3 - textOff, canvas.height * 0.28 - textOff, canvas.width);

	ctx.font = canvas.height * 0.2 + 'px impact';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.fillText('PORTFOLIO', canvas.width / 2, canvas.height * 0.4, canvas.width);

	ctx.font = canvas.height * 0.05 + 'px impact';

	let opts = 0;

	if (stage == 0) {
		opts = tabs.length;
	}
	else {
		opts = projects.length;
	}

	for (let i = 0; i < opts; i++) {
		if (i == pointer) {
			ctx.fillStyle = 'rgba(' + pulsing + ', ' + pulsing + ', ' + pulsing + ', 1)'
		}
		else {
			ctx.fillStyle = 'rgba(120,120,120, 1)'
		}

		if (stage == 0) {
			ctx.fillText(tabs[i], canvas.width / 2, canvas.height * (0.65 + 0.07 * i) + offtrans, canvas.width);
		}
		else {
			ctx.fillText(projects[i], canvas.width / 2, canvas.height * (0.65 + 0.07 * i) + offtrans, canvas.width);
		}
	}

	ctx.strokeStyle = 'rgba(255,255,255, 0)'
	if (!navigator.userAgent.toLowerCase().match(/mobile/i)) {
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2.6, p1 + offtrans);
		ctx.lineTo(canvas.width / 2.8, p2 + offtrans);
		ctx.lineTo(canvas.width / 2.8, p3 + offtrans);
		ctx.lineTo(canvas.width / 2.6, p1 + offtrans);
		ctx.stroke();
	}

	// ctx.fillText('BODIES', canvas.width/2, canvas.height * 0.9);
}

addEventListener('keydown', () => {

	if (event.keyCode == 40) {
		pointer = (pointer + 1) % 3
	}

	if (event.keyCode == 32) {
		if (pointer == 0 && stage == 0) {
			trans = true;
			targetStage = 1;
		}
		if (stage == 1) {
			document.location.href = project_refs[pointer];
		}
	}

	if (event.keyCode == 38) {
		pointer = (pointer + 2) % 3
	}

})

addEventListener('keyup', () => {

	if (event.keyCode == 36) {
	}

	if (event.keyCode == 37) {
		lft = false;
	}

	if (event.keyCode == 39) {
		rgt = false;
	}

	if (event.keyCode == 38) {
	}

})

addEventListener("touchstart", (e) => {
	if (stage == 0) {
		trans = true;
		targetStage = 1;
	}
	else {
		if (event.touches[0].pageY < canvas.height * 0.72) {
			document.location.href = 'Asteroids/Init/index.html';
		}
		else {
			document.location.href = 'Mukade/index.html';
		}
	}
});
