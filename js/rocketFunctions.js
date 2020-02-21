
function doCalculations(rocket) {
	calcThrust(rocket);
	calcDrag(rocket, environment);
	calcNetForce(rocket, environment);
	calcPosition(rocket);
}


function calcMass(rocket) {
	rocket.mass.total = rocket.mass.empty + rocket.mass.fuel + rocket.mass.payload;
}

function calcThrust(rocket) {
	if(rocket.thrust.enabled && rocket.mass.fuel != 0) {
		if(rocket.mass.fuel >= rocket.fuelUsage * timeStep) {
				rocket.mass.fuel = rocket.mass.fuel - (rocket.fuelUsage * timeStep);
				rocket.thrust.current = rocket.thrust.max;
		} else {
			rocket.fuelUsage = 0;
			rocket.mass.fuel = 0;
			rocket.thrust.current = 0;
		}
	} else {
		rocket.thrust.current = 0;
	}
	rocket.thrust.x = cos(rocket.angle) * rocket.thrust.current;
	rocket.thrust.y = sin(rocket.angle) * rocket.thrust.current;
	calcMass(rocket);
}

function calcArea(rocket) {
	let f = 0.00005;
	rocket.area.x = Math.abs(f * (rocket.h * sin(rocket.angle) + rocket.w * cos(rocket.angle)));
	rocket.area.y = Math.abs(f * (rocket.h * cos(rocket.angle) + rocket.w * sin(rocket.angle)));
}

function calcDrag(rocket, environment) {
	calcArea(rocket);
	if(rocket.vel.x != 0) {
		rocket.drag.x = 0.5 * environment.airDensity * rocket.area.x * rocket.cDrag * rocket.vel.x ** 2;
		if(rocket.vel.x > 0) {
			rocket.drag.x *= -1;
		}
	} else {
		rocket.drag.x = 0;
	}
	if(rocket.vel.y != 0) {
		rocket.drag.y = 0.5 * environment.airDensity * rocket.area.y * rocket.cDrag * rocket.vel.y ** 2;
		if(rocket.vel.y > 0) {
			rocket.drag.y *= -1;
		}
	} else {
		rocket.drag.y = 0;
	}
}

function calcNetForce(rocket, environment) {
	rocket.force.x = rocket.thrust.x + rocket.drag.x;

	rocket.force.y = rocket.thrust.y + rocket.drag.y + rocket.mass.total * environment.gravity;
}

function calcPosition(rocket) {
	if(rocket.angle < 0) {
		rocket.angle += 360;
	}
	rocket.angle = rocket.angle % 360;

	rocket.acc.x = rocket.force.x / rocket.mass.total;

	rocket.vel.xDelta = timeStep * rocket.acc.x;
	rocket.vel.x = rocket.vel.x + rocket.vel.xDelta;

	rocket.pos.xDelta = rocket.vel.x * timeStep;
	rocket.pos.x = rocket.pos.x + rocket.pos.xDelta;

	if(rocket.pos.x <= 0) {
		rocket.acc.x = 0;
		rocket.vel.x = 0;
		rocket.pos.x = 0;
	}
	if(rocket.pos.x > canvasW - rocket.w) {
		rocket.acc.x = 0;
		rocket.vel.x = 0;
		rocket.pos.x = canvasW - rocket.w;
	}

	rocket.acc.y = rocket.force.y / rocket.mass.total;

	rocket.vel.yDelta = timeStep * rocket.acc.y;
	rocket.vel.y = rocket.vel.y + rocket.vel.yDelta;

	rocket.pos.yDelta = rocket.vel.y * timeStep;
	rocket.pos.y = rocket.pos.y + rocket.pos.yDelta;

	if(rocket.pos.y <= 0) {
		rocket.acc.y = 0;
		rocket.vel.y = 0;
		rocket.pos.y = 0;

		rocket.vel.x = rocket.vel.x * 0.9;
		if(Math.abs(rocket.vel.x) <= 0.5) {
			rocket.vel.x = 0;
		}
	}
}


function ejectPayload(rocket) {
	if(rocket.mass.payload > 0 && rocket.payloadTime && time >= rocket.payloadTime-timeStep) {
			print("Payload ejected!");
			rocket.mass.payload = 0;
	}
	if(rocket.mass.payload > 0 && rocket.autoPayloadEject && rocket.acc.y < 0) {
		print("Payload ejected!");
		rocket.mass.payload = 0;
	}
	calcMass(rocket);
}

function ejectParachute(rocket) {
	if(rocket.chute.present && !rocket.chute.ejected && rocket.vel.y < 0 && rocket.pos.y <= rocket.chute.deployAlt) {
		if(rocket.chute.multiplier == 0) {
			print("Parachute ejection started!");
		}
		//The multiplier is to simulate the gradual opening of the parachute.
		if(rocket.chute.multiplier < 1) {
			rocket.chute.multiplier = rocket.chute.multiplier + 0.05;
			if(rocket.area < rocket.fuselage.area) {
				rocket.area = rocket.fuselage.area;
			}
			else {
				rocket.area = rocket.chute.area * rocket.chute.multiplier;
			}
			if(rocket.cDrag < rocket.fuselage.cDrag) {
				rocket.cDrag = rocket.fuselage.cDrag;
			}
			else {
				rocket.cDrag = rocket.chute.cDrag * rocket.chute.multiplier;
			}
		}
		else {
			rocket.chute.multiplier = 1;
			rocket.chute.ejected = true;
			print("Parachute fully ejected!");
		}
	}
}
