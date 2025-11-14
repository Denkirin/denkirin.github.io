export class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	rotate(deg) {
		const ox = this.x;
		const oy = this.y;
		this.x = Math.cos(deg) * ox - Math.sin(deg) * oy
		this.y = Math.sin(deg) * ox + Math.cos(deg) * oy
	}

	translate(x, y) {
		this.x += x;
		this.y += y;
	}

	transClone(x, y) {
		let aux = this.clone()
		aux.x += x;
		aux.y += y;
		return (aux);
	}

	scale(dis) {
		this.x = this.x * dis;
		this.y = this.y * dis;
	}

	uscale(x, y) {
		this.x = this.x * x;
		this.y = this.y * y;
	}

	sum(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}

	sumClone(vec) {
		let aux = this.clone();
		aux.sum(vec);
		return (aux);
	}

	scaleClone(dis) {
		let aux = this.clone();
		aux.scale(dis);
		return (aux);
	}

	rotatePivot(deg, pos) {
		this.translate(-pos.x, -pos.y);
		this.rotate(deg);
		this.translate(pos.x, pos.y);
	}

	magnitude() {
		if (this.x == 0 && this.y == 0) {
			return (1);
		}
		return (Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)))
	}

	distance(vec) {
		let aux = vec.clone();

		aux.scale(-1);
		aux.sum(this);

		return (aux.magnitude());
	}

	distanceComp(x, y) {
		let aux = new Vector(x, y);

		aux.scale(-1);
		aux.sum(this);

		return (aux.magnitude());
	}

	modDistance(vec, xbound, ybound) {
		let auxhl = vec.clone();
		let auxvl = vec.clone();
		let auxbl = vec.clone();
		let auxhu = vec.clone();
		let auxvu = vec.clone();
		let auxbu = vec.clone();

		let mhl = 0;
		let mvl = 0;
		let mbl = 0;
		let mhu = 0;
		let mvu = 0;
		let mbu = 0;

		let mag = 0;

		auxhl.translate(-xbound, 0);
		auxvl.translate(0, -ybound);
		auxbl.translate(-xbound, -ybound);
		auxhu.translate(+xbound, 0);
		auxvu.translate(0, +ybound);
		auxbu.translate(+xbound, +ybound);

		auxhl.scale(-1);
		auxvl.scale(-1);
		auxbl.scale(-1);
		auxhu.scale(-1);
		auxvu.scale(-1);
		auxbu.scale(-1);

		auxhl.sum(this);
		auxvl.sum(this);
		auxbl.sum(this);
		auxhu.sum(this);
		auxvu.sum(this);
		auxbu.sum(this);

		mhl = auxhl.magnitude();
		mvl = auxvl.magnitude();
		mbl = auxbl.magnitude();
		mhu = auxhu.magnitude();
		mvu = auxvu.magnitude();
		mbu = auxbu.magnitude();
		mag = this.distance(vec);

		return Math.min(Math.min(Math.min(Math.min(Math.min(Math.min(mag, mhl), mhu), mvl), mvu), mbl), mbu);
	}

	normalize() {
		const mag = this.magnitude();
		this.x = this.x / mag;
		this.y = this.y / mag;
	}

	ortho() {
		let aux = this.x;
		this.x = - this.y;
		this.y = aux;
	}

	clone() {
		return (new Vector(this.x, this.y));
	}

	dot(vec) {
		return (this.x * vec.x + this.y * vec.y);
	}
}

// FUNCTIONS

function splitNumber(num) {
	res = [];

	while (num / 10 >= 1) {
		res.push(num % 10);
		num = Math.floor(num / 10);
	}

	res.push(num);

	return (res);

}