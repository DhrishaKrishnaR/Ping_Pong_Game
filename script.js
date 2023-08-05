//We need to update the loop
//break everything in the game into separate clases


const ball= new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
// Get the start button element and add a click event listener to start the game
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
const resumeButton = document.getElementById('resumeButton');
resumeButton.addEventListener('click', resumeGame);
const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopGame);
const buttonContainer = document.querySelector('.container');
let lastTime;
// Set a variable to keep track of the game state
let isGameStarted = false; 
function update(time)
{
    if(isGameStarted) {
    if(lastTime !=null)
    {
        const delta = time- lastTime;
        //updation code here
        //playerpaddle.rect and computerpaddle.rect makes the rectangles passed into the ball
        ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()])
        //paddle needs to know where the ball is 
        computerPaddle.update(delta,ball.y)
        if(isLose()) handleLose();
    }
}
    lastTime = time;
    window.requestAnimationFrame(update);

}
// Function to start the game
function startGame() {
    // Reset the game elements
    ball.reset();
    playerPaddle.reset();
    computerPaddle.reset();
    playerScoreElem.textContent = '0'; // Reset player score
    computerScoreElem.textContent = '0'; // Reset computer score
    // Start the game loop
    isGameStarted = true;

}
function resumeGame() {
    // Resume the game loop
    isGameStarted = true;
}
function stopGame() {
    // Resets the game elements and stop the game loop
    isGameStarted = false;
    playerPaddle.reset();
    computerPaddle.reset();
}
function isLose()
{
    //if ball out of bounds we have lost
    const rect=ball.rect();
    return rect.right >=window.innerWidth || rect.left<=0

}
//reset if lost
function handleLose()
{
    const rect=ball.rect();
    if(rect.right >= window.innerWidth)
    {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    }
    else
    {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset()
    playerPaddle.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove",e=>
{
    // divide to convert pixel to percentage bcoz in css it is in percentage 
    //no need for updation ... it moves as per our mouse
    playerPaddle.position=e.y / window.innerHeight *100
    // needs update for computer paddle
});
/*serInterval(update,10) (updates 10 milliseconds) should not be used 
they are not accurate
with window req -> everytime we change this func is called*/
window.requestAnimationFrame(update);
