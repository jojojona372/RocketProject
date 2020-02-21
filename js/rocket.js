let keyW = 87;
let keyA = 65;
let keyS = 83;
let keyD = 68;
let keyR = 82;

class Rocket {
	constructor(name, w, h, thrust, eMass, pMass, fMass, fMax, fUsage, color = 'red') {
		this.name = name;
		this.w = w;
		this.h = h;
		this.fuelUsage = fUsage;
		this.color = color;
		//This is the angle from the horizontal plane
		this.angle = 90;
		//I have not yet been able to find a method to calculate the drag coefficient accurately, so I will use this value for the time being.
		this.cDrag = 0.80;

		this.mass = new Mass(eMass, pMass, fMass, fMax);
		this.pos = new Vector(0, 0, 0, 0);
		this.vel = new Vector(0, 0, 0, 0);
		this.acc = new Vector(0, 0);
		this.drag = new Vector(0, 0);
		this.force = new Vector(0, 0);
		this.thrust = new Thruster(thrust);
		this.area = new Vector(0, 0);
	}

	draw() {
		if(keyIsDown(keyW)) {
			this.thrust.enabled = true;
		} else {
			this.thrust.enabled = false;
		}

		if(keyIsDown(keyA)) {
			this.angle += 5;
		}
		if(keyIsDown(keyS)) {

		}
		if(keyIsDown(keyD)) {
			this.angle -= 5;
		}
		if(keyIsDown(keyR)) {
			this.refuel();
		}

		doCalculations(rocket);

		push();
		fill(this.color);
		translate(this.pos.x + 0.5 * this.w, -this.pos.y + (canvasH-this.h) + 0.5 * this.h);
		rotate(-this.angle + 90);
		translate(-0.5 * this.w, -0.5 * this.h);
		rect(0, 0, this.w, this.h);
		pop();
	}

	refuel() {
		if(this.pos.y == 0 && this.mass.fuel < this.mass.fuelMax) {
			this.mass.fuel += 0.5 * this.fuelUsage;
			if(this.mass.fuel > this.mass.fuelMax) {
				this.mass.fuel = this.mass.fuelMax;
			}
		}
	}
}
