
//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//snake food
var foodX;
var foodY;

//snake movement
var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

//game over function
var gameOver = false;

//score points show
var score;
var highScore;

//score values
var scorePoints = 0;
var highScorePoints = localStorage.getItem('highscore');
if (highScorePoints == null) {
    highScorePoints = 0;
}

window.onload = function() {
    board = document.getElementById('game-canvas');
    score = document.getElementById('score');
    score.textContent = "Score: " + scorePoints;
    highScore = document.getElementById('high-score');
    highScore.textContent = "High Score: " + highScorePoints;
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext('2d'); //this is for the board drawing

    snakefood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 100); // 100 milliseconds interval for each draw
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blocksize, blocksize);
   
    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        snakefood();
        scorePoints += 1;
        score.textContent = "Score: " + scorePoints;
        if (scorePoints > highScorePoints) {
            highScorePoints = scorePoints;
        }
        localStorage.setItem('highscore', highScorePoints);
        highScore.textContent = "High Score: " + highScorePoints;
    }
    
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > (cols-1) * blocksize || snakeY < 0 || snakeY > (rows-1) * blocksize) {
        gameOver = true;
        alert('Game Over');
        location.reload();
    }

    for ( let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('Game Over');
            location.reload();
        }
    }
}

function snakefood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
    for ( let i = 0; i < snakeBody.length; i++) {
        if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
            snakefood();
        }
    }
}

function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}