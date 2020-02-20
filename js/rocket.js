let keyW = 87;
let keyA = 65;
let keyS = 83;
let keyD = 68;


class Rocket {
	constructor(name, w, h, thrust, eMass, pMass, fMass, fMax, color = 'red') {
		this.name = name;
		this.w = w;
		this.h = h;
		this.color = color;

		//This is the angle from the horizontal plane
		this.angle = 90;

		this.mass = new Mass(eMass, pMass, fMass, fMax);
		// this.mass.empty = eMass;
		// this.mass.payload = pMass;
		// this.mass.fuel = fMass;
		// this.mass.fuelMax = fMax;
		// this.mass.total = eMass+pMass+fMass;

		this.pos = new Vector(0, 0, 0, 0);
		// this.pos.x = x;
		// this.pos.y = y;
		// this.pos.xDelta = 0;
		// this.pos.yDelta = 0;

		this.vel = new Vector(0, 0, 0, 0);
		// this.vel.x = 0;
		// this.vel.y = 0;
		// this.vel.xDelta = 0;
		// this.vel.yDelta = 0;

		this.acc = new Vector(0, 0);
		// this.acc.x = 0;
		// this.acc.y = 0;

		this.thrust = new Thruster(thrust);
		// this.thrust.total = 0;
		// this.thrust.x = 0;
		// this.thrust.y = 0;

		this.area = new Vector(0, 0);

		//I have not yet been able to find a method to calculate this accurately, so I will use this value for the time being.
		this.cDrag = 0.80;
		this.drag = new Vector(0, 0);

		this.force = new Vector(0, 0);
		// this.force.x = 0;
		// this.force.y = 0;

	}

	updateHeight(){
		//this.y = height - (0.000000000000001 * frameCount ** 9.81) - this.h;
	}

	draw() {

		if(keyIsDown(keyW)) {
			// print('W');
			// this.vel.y += 10;
			this.thrust.enabled = true;
		} else {
			this.thrust.enabled = false;
		}

		if(keyIsDown(keyA)) {
			// print('A');
			//this.pos.x -= 10;
			this.angle += 5;
		}
		if(keyIsDown(keyS)) {
			// print('S');
			// this.vel.y -= 10;
		}
		if(keyIsDown(keyD)) {
			// print('D');
			//this.pos.x += 10;
			this.angle -= 5;
		}

		//this.vel.x = this.vel.x | 0;
		//this.vel.y = this.vel.y | 0;

		// if(keyIsDown(keyW)) {
			// //print('W');
			// this.vel.y += 10;
		// }
		// if(keyIsDown(keyA)) {
			// //print('A');
			// this.vel.x -= 10;
		// }
		// if(keyIsDown(keyS)) {
			// //print('S');
			// this.vel.y -= 10;
		// }
		// if(keyIsDown(keyD)) {
			// //print('D');
			// this.vel.x += 10;
		// }

		// calcPosition(this, environment);
		doCalculations(rocket);

		//this.updateHeight();

		//if (this.y < -this.h) {
		//	frameCount = 0;
		//}
		//print(rocket.acc.x);

		push();
		fill(this.color);
		translate(this.pos.x + 0.5 * this.w, -this.pos.y + 600 + 0.5 * this.h);
		rotate(-this.angle + 90);
		translate(-0.5 * this.w, -0.5 * this.h);
		rect(0, 0, this.w, this.h);
		pop();
	}
}
