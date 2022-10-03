const page = document.querySelector('.page');
const tip = page.querySelector('.game__tip');
const score = page.querySelector('.game__score');
const canvas = page.querySelector('.game__field');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = './images/pink_ground.png';

const background = 'pink';

const food = new Image();
food.src = './images/food.png';

const box = 16;

let scoreCounter = 0;

const foodSpawn = {};

function spawnFood() {
  foodSpawn.x = Math.floor(Math.random() * 36) * 16;
  foodSpawn.y = Math.floor(Math.random() * 36) * 16;
}

spawnFood();

let snake = [];
snake[0] = {
  x: 18 * box,
  y: 18 * box,
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;;

let dir = '';

function changeDirection(evt) {
  tip.textContent = 'Погнали!';
  evt.preventDefault();
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
    ctx.fillStyle = i === 0 ? '#005500' : '#008800';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  if (snakeX === foodSpawn.x && snakeY === foodSpawn.y) {
    scoreCounter ++;
    speed -= 3;
    spawnFood();
    clearInterval(game);
    game = setInterval(drawGame, speed);
  } else {
      snake.pop();
  }

  score.textContent = 'Уровень: ' + scoreCounter;

  if (snakeX < 0 || snakeX > box * 37 || snakeY < 0 || snakeY > box * 37) {
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
  document.removeEventListener('keydown', changeDirection);
  tip.textContent = 'Вы проиграли! Нажмите ENTER, чтобы начать заново.'
  page.setAttribute('style', 'background-color: #f00;');
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Enter') {
      location.reload();
    }
  });
}

document.addEventListener('keydown', changeDirection);

let speed = 150;
let game = setInterval(drawGame, speed);







