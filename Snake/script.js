/* define the snake */

let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
];


// velocity
let dx = 10;
let dy = 0;


//get canvas element
var gameCanvas = document.getElementById("gameCanvas");

// return a two dimensional drawing context
var ctx = gameCanvas.getContext("2d");

var image = new Image();
image.src = "Asset 1.png";

/*image.onload function(){
//    ctx.drawImage(image, 0, 0);
//};*/

createFood();
main();


document.addEventListener("keydown", changeDirection)


//*                functions                *//

function main(){
    if(didGameEnd()) return endGameCanvas();

    setTimeout(function onTick(){
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        drawSnakeHead();

        main();
    }, 100);
}

function clearCanvas(){
    ctx.fillStyle = "pink";
    ctx.strokeStyle = "black";

    ctx.fillRect(0,0,gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0,0,gameCanvas.width, gameCanvas.height);
   
}

function endGameCanvas(){
    ctx.fillStyle = "Green";
    ctx.font="30px Verdana";
    ctx.fillText("You suck! :D", 10, 90)
}

function drawSnakeSection(snakeSection){
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';

    ctx.fillRect(snakeSection.x, snakeSection.y, 10, 10);
    ctx.strokeRect(snakeSection.x, snakeSection.y, 10, 10);
   
}

function drawSnake(){
    snake.slice(0).forEach(drawSnakeSection);
    ctx.drawImage(image, snake[0].x, snake[0].y, 10, 10);
}

function drawSnakeHead(){
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    var rotate = 0;
    if (goingRight) {
        rotate = 180 * Math.PI/180;
    } 
     else if (goingLeft) {
          rotate = 0 * Math.PI/180;
    } 
    else if (goingUp) {
          rotate = 90 * Math.PI/180;
    } 
    else if (goingDown) {
         rotate = 270 * Math.PI/180;
    } 

    var x = gameCanvas.width / 2;
    var y = gameCanvas.width / 2;
    var width = image.width;
    var height = image.height;  
    

   // ctx.drawImage(image, snake[0].x, snake[0].y, 10, 10);
   
   ctx.translate(snake[0].x, snake[0].y);
   ctx.rotate(rotate);
   //ctx.drawImage(image, -width/2, -height/2, 10, 10);
   ctx.drawImage(image, -10/2, -10/2, 10, 10);
   ctx.rotate(-rotate);
   ctx.translate(-snake[0].x, -snake[0].y);

}

function moveSnake(){
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    
    snake.unshift(head);
    
    const didEatFood = snake[0].x ==foodX && snake[0].y === foodY;
    if(didEatFood){
        createFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
}

function randomTen(min, max){
    return Math.round((Math.random() * (max-min) + min) / 10 ) * 10;
}

function createFood(){
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);

    snake.forEach(function isFoodOnSnake(part){
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if(foodIsOnSnake)
        createFood();
    });
}

function drawFood(){
    ctx.fillStyle = "purple";
    ctx.strokeStyle = "green";
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function didGameEnd(){
    for(let i =4; i <snake.length; i++){
        const didCollide = snake[i].x === snake[0].x && 
            snake[i].y === snake[0].y;

            if(didCollide){return true;}
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;
    return hitLeftWall || 
           hitRightWall || 
           hitToptWall ||
           hitBottomWall;
}