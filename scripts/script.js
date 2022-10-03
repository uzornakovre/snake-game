const page = document.querySelector('.page');
const canvas = page.querySelector('.game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = './images/ground.png';

const food = new Image();
food.src = './images/food.png';

const box = 32;

let score = 0;

const foodSpawn = {};

function spawnFood() {
  foodSpawn.x = Math.floor(Math.random() * 17 + 1) * 32;
  foodSpawn.y = Math.floor(Math.random() * 15 + 3) * 32;
}

spawnFood();

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;;

let dir = '';

function changeDirection(evt) {
  if (evt.key === 'ArrowUp' && dir != 'down') {
    dir = 'up';
  } else if (evt.key === 'ArrowRight' && dir != 'left') {
    dir = 'right';
  } else if (evt.key === 'ArrowDown' && dir != 'up') {
    dir = 'down';
  } else if (evt.key === 'ArrowLeft' && dir != 'right') {
    dir = 'left';
  }
}

function eatTale(head, snakeBody) {
  for (let i = 0; i < snakeBody.length; i++) {
    if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
      failGame();
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(food, foodSpawn.x, foodSpawn.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#00f' : '#aac';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = '#fff';
  ctx.font = '40px Inter';
  ctx.fillText(score, box * 2.5, box * 1.5);

  if (snakeX === foodSpawn.x && snakeY === foodSpawn.y) {
    score ++;
    spawnFood();
  } else {
      snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
    failGame();
  }

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  const snakeHead = {
    x: snakeX,
    y: snakeY,
  }

  eatTale(snakeHead, snake);

  snake.unshift(snakeHead);

}

function failGame() {
  clearInterval(game);
  page.setAttribute('style', 'background-color: #f00;');
}

document.addEventListener('keydown', changeDirection);

let game = setInterval(drawGame, 200);