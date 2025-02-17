const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 100, y: 100 }];
let direction = "RIGHT";
let food = { x: 200, y: 200 };
let gameOver = false;
let score = 0;

const moveSnake = () => {
    const head = { ...snake[0] };

    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || isCollidingWithBody(head)) {
        gameOver = true;
    }
};

const isCollidingWithBody = (head) => {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
};

const generateFood = () => {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
};

const drawGame = () => {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvasSize / 4, canvasSize / 2);
        ctx.fillText(`Score: ${score}`, canvasSize / 4, canvasSize / 2 + 40);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    moveSnake();
};

const changeDirection = (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
};

document.addEventListener("keydown", changeDirection);

const gameLoop = () => {
    drawGame();
    if (!gameOver) {
        setTimeout(gameLoop, 100);
    }
};

gameLoop();
