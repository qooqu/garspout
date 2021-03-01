var container;

var camera, controls, scene, renderer;

var clock;
var time;

var farmRot = 0;
var farmDrop = 0;
var farmTurn = 0;
var freq = 1;
var devMag = 1;
var devShift = 0;
var extMag = 1;
var extShift = 0;
var extPhase = 0;
var pickStyle = 0;

var allObjects;

var hand;
var farm;
// var pick;
var wristHand;
var wristFarm;

var stringE;
var stringA;
var stringD;
var stringG;
var stringB;
var stringEE;
var sp = 0.012;

function init() {

	container = document.getElementById( 'canvas' );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( container.clientWidth, container.clientHeight );

	container.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

	camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 10000);
	camera.position.z = 0.3;
	
	renderer.setClearColor( 0x000000 );
	
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene = new THREE.Scene();
	
	clock = new THREE.Clock();

	bigFun();
	
	animate();

}

function animate() {

	time = clock.getElapsedTime();
	
	// Y = DEVIATION
	// Z = EXTENSION
	
	wristHand.rotation.y = ( devShift * ( 2 * Math.PI ) ) + devMag * Math.sin( freq * time ) * ( 0.125 * 2 * Math.PI );
	
	if( pickStyle == 0 ) {
		wristHand.rotation.z = ( extShift * ( 2 * Math.PI ) ) + extMag * Math.sin( freq * time + extPhase * Math.PI ) * ( 0.125 * 2 * Math.PI );
	}
	else {
		if( pickStyle == -1 ) {
			wristHand.rotation.z = ( extShift * ( 2 * Math.PI ) ) + extMag * Math.sin( 2 * freq * time + extPhase * Math.PI ) * ( 0.125 * 2 * Math.PI );
		}
		else {
			if( Math.sin( freq * time + extPhase * Math.PI ) < 0 ) {
				wristHand.rotation.z = ( extShift * ( 2 * Math.PI ) ) + extMag * Math.sin( freq * time + extPhase * Math.PI ) * ( 0.125 * 2 * Math.PI );
			}
			else {
				wristHand.rotation.z = 0;
			}
		}
	}

	requestAnimationFrame(animate);

	render();

}

function bigFun() {

	scene = new THREE.Scene();
	getVals();
	addGeom();

}

function getVals() {
	
	farmRot = document.getElementById("farmRot").value;
	farmDrop = document.getElementById("farmDrop").value;
	farmTurn = document.getElementById("farmTurn").value;
	freq = document.getElementById("freq").value;
	devMag = document.getElementById("devMag").value;
	devShift = document.getElementById("devShift").value;
	extMag = document.getElementById("extMag").value;
	extShift = document.getElementById("extShift").value;
	extPhase = document.getElementById("extPhase").value;
	pickStyle = document.getElementById("pickStyle").value;
	
//	document.getElementById("yo").innerHTML = freq;
	
}

function addGeom() {
	
	stringE = new THREE.Mesh(new THREE.CylinderGeometry( 0.0005, 0.0005, 1, 10, false ), new THREE.MeshNormalMaterial() );
	stringE.rotation.z = Math.PI / 2;
	stringE.position.set( -0.45, -0.025, 2.5 * sp );
	
	stringA = stringE.clone();
	stringA.translateZ ( -sp);
	
	stringD = stringA.clone();
	stringD.translateZ ( -sp);
	
	stringG = stringD.clone();
	stringG.translateZ ( -sp);
	
	stringB = stringG.clone();
	stringB.translateZ ( -sp);
	
	stringEE = stringB.clone();
	stringEE.translateZ ( -sp);
	
	hand = new THREE.Mesh(new THREE.BoxGeometry( 0.075, 0.03, 0.075 ), new THREE.MeshNormalMaterial() );
	farm = new THREE.Mesh(new THREE.BoxGeometry( 0.25, 0.03, 0.075 ), new THREE.MeshNormalMaterial() );

	hand.position.set( -0.04, 0, 0 );
	farm.position.set( 0.13, 0, 0 );
	
	wristHand = new THREE.Mesh(new THREE.BoxGeometry( 0.01, 0.01, 0.01 ), new THREE.MeshNormalMaterial() );
	wristFarm = new THREE.Mesh(new THREE.BoxGeometry( 0.01, 0.01, 0.01 ), new THREE.MeshNormalMaterial() );
	
	wristHand.add( hand );
	wristFarm.add( farm );
	wristFarm.add( wristHand );
	
	wristFarm.eulerOrder = 'YXZ';
	
	wristFarm.rotation.x = farmRot;

	wristFarm.position.set( 0, 0, farmDrop );

	wristFarm.rotation.y = farmTurn * ( 0.125 * 2 * Math.PI );
	
	scene.add( stringE, stringA, stringD, stringG, stringB, stringEE );
	scene.add( wristFarm );

}

function render() {
	
	controls.update();

	renderer.render(scene, camera);

}

function onWindowResize() {

	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( container.clientWidth, container.clientHeight );

}

// Preset: String hopping
function presetSH() {

	document.getElementById("farmRot").value = 0;
	document.getElementById("farmDrop").value = 0;
	document.getElementById("farmTurn").value = -0.2;
	document.getElementById("freq").value = 8;
	document.getElementById("devMag").value = 0.5;
	document.getElementById("devShift").value = 0.03;
	document.getElementById("extMag").value = 0.3;
	document.getElementById("extShift").value = 0;
	document.getElementById("extPhase").value = 0.5;
	document.getElementById("pickStyle").value = -1;
	
	bigFun();

}

// Preset: Supinated Deviation
function presetSD() {

	document.getElementById("farmRot").value = -0.2;
	document.getElementById("farmDrop").value = -0.025;
	document.getElementById("farmTurn").value = -0.2;
	document.getElementById("freq").value = 8;
	document.getElementById("devMag").value = 0.5;
	document.getElementById("devShift").value = 0.03;
	document.getElementById("extMag").value = 0;
	document.getElementById("extShift").value = 0;
	document.getElementById("extPhase").value = 0;
	document.getElementById("pickStyle").value = 0;
	
	bigFun();

}

// Preset: Supinated Reverse Dart Thrower
function presetSRDT() {

	document.getElementById("farmRot").value = -0.2;
	document.getElementById("farmDrop").value = -0.025;
	document.getElementById("farmTurn").value = -0.2;
	document.getElementById("freq").value = 8;
	document.getElementById("devMag").value = 0.5;
	document.getElementById("devShift").value = 0.03;
	document.getElementById("extMag").value = 0.25;
	document.getElementById("extShift").value = 0;
	document.getElementById("extPhase").value = 0;
	document.getElementById("pickStyle").value = 0;
	
	bigFun();

}

// Preset: Supinated Crosspicking
function presetSCP() {

	presetSRDT();
	document.getElementById("pickStyle").value = 1;
	
	bigFun();

}

// Preset: Pronated Deviation
function presetPD() {

	document.getElementById("farmRot").value = 0.2;
	document.getElementById("farmDrop").value = -0.025;
	document.getElementById("farmTurn").value = -0.2;
	document.getElementById("freq").value = 8;
	document.getElementById("devMag").value = 0.5;
	document.getElementById("devShift").value = 0.03;
	document.getElementById("extMag").value = 0;
	document.getElementById("extShift").value = 0;
	document.getElementById("extPhase").value = 0;
	document.getElementById("pickStyle").value = 0;
	
	bigFun();

}

// Preset: Pronated Dart Thrower
function presetPDT() {

	document.getElementById("farmRot").value = 0.2;
	document.getElementById("farmDrop").value = -0.025;
	document.getElementById("farmTurn").value = -0.2;
	document.getElementById("freq").value = 8;
	document.getElementById("devMag").value = 0.5;
	document.getElementById("devShift").value = 0.03;
	document.getElementById("extMag").value = 0.25;
	document.getElementById("extShift").value = 0;
	document.getElementById("extPhase").value = 1;
	document.getElementById("pickStyle").value = 0;
	
	bigFun();

}

// Preset: Pronated Crosspicking
function presetPCP() {

	presetPDT();
	document.getElementById("pickStyle").value = 1;
	
	bigFun();

}
