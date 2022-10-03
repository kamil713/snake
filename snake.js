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

		return this.position.x;
	}

	moveVertically() {
		this.position.y += this.velocity.y;
		snakeElement.style.top = this.position.y + 'px';

		return this.position.y;
	}
}

class SnakeTail extends Snake {
	constructor() {
		super();
	}

	velocityTail = {
		x: 0,
		y: 0,
	};
	allTails = [];

	render() {
		const snakeTail = document.createElement('div');
		snakeTail.className = 'snake_tail';
		// snakeTail.style.left = this.position.x + 'px';
		// snakeTail.style.top = this.position.y + 'px';

		this.allTails.push(snakeTail);
		return snakeTail;
	}

	moveTail(x, y) {
		if (this.allTails.length > 0) {
			for (let i = 0; i < this.allTails.length; i++) {
				this.allTails[i].style.left = x - this.velocityTail.x * (i + 1) + 'px';
				this.allTails[i].style.top = y - this.velocityTail.y * (i + 1) + 'px';
			}
		}
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
const candy = new Candy();
const snake = new Snake();
const snakeTail = new SnakeTail();

function animate() {
	snake.moveHorizontally();
	snake.moveVertically();
	snakeTail.moveTail(snake.position.x, snake.position.y);

	if (board.lastChild.className !== 'candy') {
		board.appendChild(candy.render());
	} else {
		const candy = document.querySelector('.candy');

		if (
			snake.position.x + 'px' === candy.style.left &&
			snake.position.y + 'px' === candy.style.top
		) {
			// tutaj renderowac nowy element
			snakeElement.insertAdjacentElement('afterend', snakeTail.render());
			board.removeChild(candy);
			console.log(snakeTail.allTails);
		}
	}

	// if (snakeTailHandler.length > 0) {
	// 		if (
	// 			document.querySelectorAll('.snake_tail').length <
	// 			snakeTailHandler.length
	// 		) {
	// 			snakeElement.insertAdjacentElement('afterend', snakeTail.render());
	// 		}
	// }

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
				snakeTail.velocityTail.x = -20;
				snakeTail.velocityTail.y = 0;
			}
			// console.log('Left');
			break;
		case 38:
			if (snake.velocity.y > 0) break;
			if (snake.velocity.y === 0) {
				snake.velocity.x = 0;
				snake.velocity.y = 20;
				snake.velocity.y = -snake.velocity.y;
				snakeElement.style.transform = 'rotate(-90deg)';
				snakeTail.velocityTail.x = 0;
				snakeTail.velocityTail.y = -20;
			}
			// console.log('Up');
			break;
		case 39:
			if (snake.velocity.x > 0) break;
			if (snake.velocity.x === 0) {
				snake.velocity.y = 0;
				snake.velocity.x = 20;
				snakeElement.style.transform = 'rotate(0deg)';
				snakeTail.velocityTail.x = 20;
				snakeTail.velocityTail.y = 0;
			}
			// console.log('Right');
			break;
		case 40:
			if (snake.velocity.y < 0) break;
			if (snake.velocity.y === 0) {
				snake.velocity.x = 0;
				snake.velocity.y = 20;
				snakeElement.style.transform = 'rotate(90deg)';
				snakeTail.velocityTail.x = 0;
				snakeTail.velocityTail.y = 20;
			}
			// console.log('Down');
			break;
	}
});
