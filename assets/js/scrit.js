const	firePixelsArray = [];
const	fireWidth = 2;
const	fireHeigth = 3;

function start() {
	createFireDataStructure();
	console.log(firePixelsArray);
}

function createFireDataStructure() {
	const	numberOfPixels = (fireWidth * fireHeigth);

	for (let i = 0; i < numberOfPixels; i++) {
		firePixelsArray[i] = 0;
	}
}

function calculateFire() {
	let	html = '<table cellpadding=0 cellspacing=0>'

	html =+ '</table>'
}

// document.addEventListener('DOMContentLoaded', start);
start();
