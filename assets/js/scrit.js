const	firePixelsArray = [];
const	fireWidth = 10;
const	fireHeigth = 10;

function start() {
	createFireDataStructure();
	renderFire();
}

function createFireDataStructure() {
	const	numberOfPixels = (fireWidth * fireHeigth);

	for (let i = 0; i < numberOfPixels; i++) {
		firePixelsArray[i] = 0;
	}
}

function calculateFirePropagation() {

}

function renderFire() {
	let	html = '<table cellpadding=0 cellspacing=0>';

	for (let row = 0; row < fireHeigth; row++) {
		html += '<tr>';
		for (let column = 0; column < fireWidth; column++) {
			const	pixelIndex = column + (fireWidth * row);
			html += '<td>';
			html += `<div class="pixel__index">${pixelIndex}</div>`;
			html += '</td>';
		}
		html += '</tr>';
	}
	html += '</table>';
	document.querySelector('#fireCanvas').innerHTML = html;
}

start();
