const board = document.getElementById('board');

const SNAKE_SPEED = 5;
let lastRenderTime = 0;
let gameOver = false;

let numbers = [];
for (let i = 0; i <= 480; i += 20) {
	numbers.push(i);
}

class Input {
	inputDirection = { x: 0, y: 0 };
	lastInputDirection = { x: 0, y: 0 };

	getInputDirection() {
		this.lastInputDirection = this.inputDirection;
		return this.inputDirection;
	}
}

class Snake extends Input {
	snakeBody = [{ x: 240, y: 240 }];
	newSegments = 0;
	rotate = 'rotate(0deg)';

	draw() {
		board.innerHTML = '';

		this.snakeBody.forEach((segment, index) => {
			const snakeElement = document.createElement('div');
			snakeElement.style.left = segment.x + 'px';
			snakeElement.style.top = segment.y + 'px';
			snakeElement.className = 'snake_tail';
			board.appendChild(snakeElement);

			if (index === 0) {
				snakeElement.style.transform = this.rotate;
				snakeElement.className = 'snake';
			}
		});
	}

	update() {
		this.addSegments();

		const snakeHeadPos = this.getInputDirection();
		for (let i = this.snakeBody.length - 2; i >= 0; i--) {
			this.snakeBody[i + 1] = { ...this.snakeBody[i] };
		}

		this.snakeBody[0].x += snakeHeadPos.x;
		this.snakeBody[0].y += snakeHeadPos.y;
	}

	expandSnake(amount) {
		snake.newSegments += amount;
	}

	onSnake(position, { ignoreHead = false } = {}) {
		return snake.snakeBody.some((segment, index) => {
			if (ignoreHead && index === 0) return false;
			return snake.equalPosition(segment, position);
		});
	}

	snakeHead() {
		return this.snakeBody[0];
	}

	snakeIntersection() {
		return this.onSnake(this.snakeBody[0], { ignoreHead: true });
	}

	outsiderBoard() {
		return (
			this.snakeHead().x < 0 ||
			this.snakeHead().x > 480 ||
			this.snakeHead().y < 0 ||
			this.snakeHead().y > 480
		);
	}

	equalPosition(pos1, pos2) {
		return pos1.x === pos2.x && pos1.y === pos2.y;
	}

	addSegments() {
		for (let i = 0; i < this.newSegments; i++) {
			this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
		}

		this.newSegments = 0;
	}
}

class Candy extends Snake {
	constructor() {
		super();
		this.food = {
			x: this.getRandomCandyPosition(),
			y: this.getRandomCandyPosition(),
		};
	}

	draw() {
		const candyEl = document.createElement('div');
		candyEl.style.left = this.food.x + 'px';
		candyEl.style.top = this.food.y + 'px';
		candyEl.className = 'candy';
		candyEl.style['background-color'] = `rgb(
      ${this.getRandomInt(255)},
			0,
			${this.getRandomInt(255)}
      )`;
		board.appendChild(candyEl);
	}

	update() {
		if (this.onSnake(this.food)) {
			this.expandSnake(1);
			this.food.x = this.getRandomCandyPosition();
			this.food.y = this.getRandomCandyPosition();
		}
	}

	getRandomCandyPosition() {
		let newCandyPosition;
		while (newCandyPosition == null || this.onSnake(newCandyPosition)) {
			newCandyPosition = numbers[this.getRandomInt(24)];
		}
		return newCandyPosition;
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
}

const snake = new Snake();
const candy = new Candy();

function checkDeath() {
	gameOver =
		snake.outsiderBoard(snake.snakeBody[0]) || snake.snakeIntersection();
}

function update() {
	snake.update();
	candy.update();
	checkDeath();
}

function draw() {
	snake.draw();
	candy.draw();
}

function animate(currentTime) {
	if (gameOver) {
		if (confirm('You lost. Press ok to restart.')) {
			location = '/';
		}
		return;
	}

	requestAnimationFrame(animate);
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

	lastRenderTime = currentTime;

	update();
	draw();
}

requestAnimationFrame(animate);

addEventListener('keydown', ({ keyCode }) => {
	switch (keyCode) {
		case 37:
			if (snake.lastInputDirection.x !== 0) break;
			snake.inputDirection = { x: -20, y: 0 };
			snake.rotate = 'rotate(180deg)';
			break;
		case 38:
			if (snake.lastInputDirection.y !== 0) break;
			snake.inputDirection = { x: 0, y: -20 };
			snake.rotate = 'rotate(-90deg)';
			break;
		case 39:
			if (snake.lastInputDirection.x !== 0) break;
			snake.inputDirection = { x: 20, y: 0 };
			snake.rotate = 'rotate(0deg)';
			break;
		case 40:
			if (snake.lastInputDirection.y !== 0) break;
			snake.inputDirection = { x: 0, y: 20 };
			snake.rotate = 'rotate(90deg)';
			break;
	}
});
