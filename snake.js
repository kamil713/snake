const board = document.querySelector('.board');
const snakeElement = document.querySelector('.snake');

let horizontally = snakeElement.offsetLeft;
let vertically = snakeElement.offsetTop;
const refreshTime = 100;
let numbers = [];

for (let i = 0; i <= 480; i += 20) {
	numbers.push(i);
}

class Snake {
	position = {
		x: horizontally,
		y: vertically,
	};

	velocity = {
		x: 0,
		y: 0,
	};

	moveHorizontally() {
		this.position.x += this.velocity.x;
		snakeElement.style.left = this.position.x + 'px';
	}

	moveVertically() {
		this.position.y += this.velocity.y;
		snakeElement.style.top = this.position.y + 'px';
	}
}

class Candy {
	render() {
		const candyEl = document.createElement('div');
		candyEl.className = 'candy';
		candyEl.style.left =
			numbers[Math.floor(Math.random() * (numbers.length - 1))] + 'px';
		candyEl.style.top =
			numbers[Math.floor(Math.random() * (numbers.length - 1))] + 'px';
		candyEl.style['background-color'] = `rgb(
			${this.getRandomInt(255)},
			${this.getRandomInt(255)},
			${this.getRandomInt(255)}
		)`;

		return candyEl;
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
}

// init
const snake = new Snake();
const candy = new Candy();

function animate() {
	snake.moveHorizontally();
	snake.moveVertically();

	if (board.lastChild.className !== 'candy') {
		// board.insertAdjacentElement('beforeend', candy.render())
		board.appendChild(candy.render());
	}

	if (board.lastChild.className === 'candy') {
		const candy = document.querySelector('.candy');

		if (
			snake.position.x + 'px' === candy.style.left &&
			snake.position.y + 'px' === candy.style.top
		) {
			board.removeChild(candy);
		}
	}

	// collision detection
	if (snake.position.x + 3 < 0 || snake.position.x + 3 > 500) {
		console.log('You lose');
	}

	if (snake.position.y + 3 < 0 || snake.position.y + 3 > 500) {
		console.log('You lose');
	}
}

setInterval(animate, refreshTime);

addEventListener('keydown', ({ keyCode }) => {
	switch (keyCode) {
		case 37:
			if (snake.velocity.x > 0) break;
			if (snake.velocity.x === 0) {
				snake.velocity.y = 0;
				snake.velocity.x = 20;
				snake.velocity.x = -snake.velocity.x;
				snakeElement.style.transform = 'rotate(180deg)';
			}
			console.log('Left');
			break;
		case 38:
			if (snake.velocity.y > 0) break;
			if (snake.velocity.y === 0) {
				snake.velocity.x = 0;
				snake.velocity.y = 20;
				snake.velocity.y = -snake.velocity.y;
				snakeElement.style.transform = 'rotate(-90deg)';
			}
			console.log('Up');
			break;
		case 39:
			if (snake.velocity.x > 0) break;
			if (snake.velocity.x === 0) {
				snake.velocity.y = 0;
				snake.velocity.x = 20;
				snakeElement.style.transform = 'rotate(0deg)';
			}
			console.log('Right');
			break;
		case 40:
			if (snake.velocity.y < 0) break;
			if (snake.velocity.y === 0) {
				snake.velocity.x = 0;
				snake.velocity.y = 20;
				snakeElement.style.transform = 'rotate(90deg)';
			}
			console.log('Down');
			break;
	}
});
