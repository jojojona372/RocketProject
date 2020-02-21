let environment;
let rocket;
let timeStep;
let background_color = 40;

let canvasW = window.innerWidth - 20;
let canvasH = window.innerHeight - 20;

function windowResized() {
	canvasW = window.innerWidth - 20;
	canvasH = window.innerHeight - 20;
  resizeCanvas(canvasW, canvasH);
}

function setup() {
	createCanvas(canvasW, canvasH);
	background(background_color);
	frameRate(60);
	timeStep = 1/15;
	angleMode(DEGREES);

	//constructor(name = "New simulation", gravity, airDensity)
	environment = new Environment("Earth", -9.81, 1.225);

	//constructor(name, w, h, thrust, eMass, pMass, fMass, fMax, fUsage, color = 'red')
	rocket = new Rocket("Rocket", 50, 100, 100, 1, 0, 5, 5, 0.1);
}

function draw() {
	background(background_color);
	fill(255);
	textSize(20);
	text("X: " + rocket.pos.x.toFixed(1), 20, 20);
	text("Y: " + rocket.pos.y.toFixed(1), 20, 40);
	text("Angle: " + rocket.angle.toFixed(1) + "°", 20, 60);
	text("Fuel: " + rocket.mass.fuel.toFixed(2) + "/" + rocket.mass.fuelMax.toFixed(2), 170, 20);
	text("Hold R when landed to refuel", 170, 40);

	let recth = 50;
	let rectw = 20;

	push();
	translate(50 + 0.5 * rectw, 80 + 0.5 * recth);
	rotate(-rocket.angle + 90);
	translate(-0.5 * rectw, -0.5 * recth);
	fill(rocket.color);
	triangle(0, 15, 10, 0, 20, 15);
	fill(255);
	rect(0, 15, rectw, recth-15);
	pop();

	rocket.draw();
}


function mouseDragged(){

}

/*
function keyTyped() {

  switch (key) {
    case 'w':
		console.log('w');
		rocket.y -= 1;
		break;
    case 'a':
		console.log('a');
		break;
    case 's':
		console.log('s');
		rocket.y += 1;
		break;
    case 'd':
		console.log('d');
		break;
  }
}
*/
