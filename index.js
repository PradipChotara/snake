// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
let speed = 2;
let lastPaintTime = 0;
const minRange = 1;
const maxRange = 18;
let snakeArr = [
    {x: getRandomNumber(minRange, maxRange), y: getRandomNumber(minRange, maxRange)}
];

food = {x: getRandomNumber(minRange, maxRange), y: getRandomNumber(minRange, maxRange)};

window.requestAnimationFrame(main);

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main); //main() will run before the next frame
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    // if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
    //     return true;
    // }

    if(snake[0].x >= 20){
        snakeArr[0].x = 1;
    }
    if(snake[0].x <= 0){
        snakeArr[0].x = 20;
    }
    if(snake[0].y >= 20){
        snakeArr[0].y = 1;
    }
    if(snake[0].y <= 0){
        snakeArr[0].y = 20;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});

function getRandomNumber(min, max) {
    // Generate a random decimal number between 0 and 1
    const randomDecimal = Math.random();
    // Scale the random decimal to the range [min, max]
    const randomNumber = min + Math.floor(randomDecimal * (max - min + 1));
    return randomNumber;
}