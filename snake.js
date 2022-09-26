const board = document.querySelector('.board');
const snakeElement = document.querySelector('.snake');

let horizontally = snakeElement.offsetLeft;
let vertically = snakeElement.offsetTop;
const refreshTime = 250;

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

const snake = new Snake();

function animate() {
	snake.moveHorizontally();
	snake.moveVertically();

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
			snake.velocity.x = 20;
			snake.velocity.y = 0;
			if (snake.velocity.x > 0) snake.velocity.x = -snake.velocity.x;
			console.log('Left');
			break;
		case 38:
			snake.velocity.x = 0;
			snake.velocity.y = 20;
			if (snake.velocity.y > 0) snake.velocity.y = -snake.velocity.y;
			console.log('Up');
			break;
		case 39:
			snake.velocity.x = 20;
			snake.velocity.y = 0;
			if (snake.velocity.x < 0) snake.velocity.x = -snake.velocity.x;
			console.log('Right');
			break;
		case 40:
			snake.velocity.x = 0;
			snake.velocity.y = 20;
			if (snake.velocity.y < 0) snake.velocity.y = -snake.velocity.y;
			console.log('Down');
			break;
	}
});
