const	firePixelsArray = [];
const	fireWidth = 10;
const	fireHeigth = 10;

function start() {
	createFireDataStructure();
	createFireSource();
	renderFire();

	setInterval(calculateFirePropagation, 1000);
}

function createFireDataStructure() {
	const	numberOfPixels = (fireWidth * fireHeigth);

	for (let i = 0; i < numberOfPixels; i++) {
		firePixelsArray[i] = 0;
	}
}

function calculateFirePropagation() {
	for (let column = 0; column < fireHeigth; column++) {
		for (let row = 0; row < fireWidth; row++) {
			const	pixelIndex = column + (fireWidth * row);
			updateFireIntensityPerPixel(pixelIndex);
		}
	}
	renderFire();
}

function updateFireIntensityPerPixel(currenPixelIndex) {
	const	belowPixelIndex = currenPixelIndex + fireWidth;

	if (belowPixelIndex >= (fireWidth * fireHeigth)) {
		return ;
	}

	const	decay = 1;
	const	belowPixeFireIntensity = firePixelsArray[belowPixelIndex];
	const	newFireIntensity = belowPixeFireIntensity - decay >= 0 ? belowPixeFireIntensity - decay : 0;

	firePixelsArray[currenPixelIndex] = newFireIntensity;
}

function renderFire() {
	let	html = '<table cellpadding=0 cellspacing=0>';

	for (let row = 0; row < fireHeigth; row++) {
		html += '<tr>';
		for (let column = 0; column < fireWidth; column++) {
			const	pixelIndex = column + (fireWidth * row);
			const	fireIntensity = firePixelsArray[pixelIndex];
			html += '<td>';
			html += `<div class="pixel__index">${pixelIndex}</div>`;
			html += fireIntensity;
			html += '</td>';
		}
		html += '</tr>';
	}
	html += '</table>';
	document.querySelector('#fireCanvas').innerHTML = html;
}

function createFireSource() {
	for (let column = 0; column <= fireWidth; column++) {
		const	overflowPixelIndex = (fireWidth * fireHeigth);
		const	pixelIndex = (overflowPixelIndex - fireWidth) + column;

		firePixelsArray[pixelIndex] = 36;
	}
}

start();
