const	firePixelsArray = [];
let		fireWidth = 60;
let		fireHeigth = 40;
let		debug = false;
let		direction = 0;
const fireColorsPalette = [
	{"r":7,"g":7,"b":7}, {"r":31,"g":7,"b":7},
	{"r":47,"g":15,"b":7}, {"r":71,"g":15,"b":7},
	{"r":87,"g":23,"b":7}, {"r":103,"g":31,"b":7},
	{"r":119,"g":31,"b":7}, {"r":143,"g":39,"b":7},
	{"r":159,"g":47,"b":7}, {"r":175,"g":63,"b":7},
	{"r":191,"g":71,"b":7}, {"r":199,"g":71,"b":7},
	{"r":223,"g":79,"b":7}, {"r":223,"g":87,"b":7},
	{"r":223,"g":87,"b":7}, {"r":215,"g":95,"b":7},
	{"r":215,"g":95,"b":7}, {"r":215,"g":103,"b":15},
	{"r":207,"g":111,"b":15}, {"r":207,"g":119,"b":15},
	{"r":207,"g":127,"b":15}, {"r":207,"g":135,"b":23},
	{"r":199,"g":135,"b":23}, {"r":199,"g":143,"b":23},
	{"r":199,"g":151,"b":31}, {"r":191,"g":159,"b":31},
	{"r":191,"g":159,"b":31}, {"r":191,"g":167,"b":39},
	{"r":191,"g":167,"b":39}, {"r":191,"g":175,"b":47},
	{"r":183,"g":175,"b":47}, {"r":183,"g":183,"b":47},
	{"r":183,"g":183,"b":55}, {"r":207,"g":207,"b":111},
	{"r":223,"g":223,"b":159}, {"r":239,"g":239,"b":199},
	{"r":255,"g":255,"b":255}
]

function createFireDataStructure() {
	const	numberOfPixels = (fireWidth * fireHeigth);

	for (let i = 0; i < numberOfPixels; i++) {
		firePixelsArray[i] = 0;
	}
}

function createFireSource() {
	for (let column = 0; column <= fireWidth; column++) {
		const	overflowPixelIndex = (fireWidth * fireHeigth);
		const	pixelIndex = (overflowPixelIndex - fireWidth) + column;

		firePixelsArray[pixelIndex] = 36;
	}
}

function renderFire() {
	let	html = '<table cellpadding=0 cellspacing=0>';

	for (let row = 0; row < fireHeigth; row++) {
		html += '<tr>';
		for (let column = 0; column < fireWidth; column++) {
			const	pixelIndex = column + (fireWidth * row);
			const	fireIntensity = firePixelsArray[pixelIndex];

			if (debug === true) {
				html += '<td>';
				html += `<div class="pixel__index">${pixelIndex}</div>`;
				html += fireIntensity;
				html += '</td>';
			} else {
				const	color = fireColorsPalette[fireIntensity];
				const	colorString = `${color.r}, ${color.g}, ${color.b}`;
				html += `<td class="pixel" style="background-color: rgb(${colorString})"`;
				html += `</td>`;
			}
		}
		html += '</tr>';
	}
	html += '</table>';
	document.querySelector('#fireCanvas').innerHTML = html;
}

function changeWinDirection(value) {
	direction = value;
}

function updateFireIntensityPerPixel(currenPixelIndex) {
	const	belowPixelIndex = currenPixelIndex + fireWidth;

	if (belowPixelIndex >= (fireWidth * fireHeigth)) {
		return ;
	}

	const	decay = Math.floor(Math.random() * 3);
	const	belowPixeFireIntensity = firePixelsArray[belowPixelIndex];
	const	newFireIntensity = belowPixeFireIntensity - decay >= 0 ? belowPixeFireIntensity - decay : 0;

	switch(direction) {
		case 0:
			firePixelsArray[currenPixelIndex - decay] = newFireIntensity;
			break ;
		case 1:
			firePixelsArray[currenPixelIndex] = newFireIntensity;
			break ;
		case 2:
			firePixelsArray[currenPixelIndex + decay] = newFireIntensity;
			break ;
	}
}

function calculateFirePropagation() {
	for (let column = 0; column < fireWidth; column++) {
		for (let row = 0; row < fireHeigth; row++) {
			const	pixelIndex = column + (fireWidth * row);
			updateFireIntensityPerPixel(pixelIndex);
		}
	}
	renderFire();
}

function toggleDebugMode() {
	console.log('estou no toggle');
	if (debug === false) {
		fireWidth = 25;
		fireHeigth = 17;
		debug = true;
	} else {
		fireWidth = 60;
		fireHeigth = 40;
		debug = false;
	}
	createFireDataStructure();
	createFireSource();
}

function start() {
	createFireDataStructure();
	createFireSource();
	setInterval(calculateFirePropagation, 50);
}

document.addEventListener('DOMContentLoaded', start());
