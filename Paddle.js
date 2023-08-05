const SPEED=0.02
class Paddle
{
    constructor(paddleElem)
    {
        this.paddleElem=paddleElem;
        this.reset()
    }
    get position()
    {
        //take the css value and converted to js value that we can use
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }
    set position(value)
    {
        this.paddleElem.style.setProperty("--position",value)
    }
    //rectangles for the paddles
    rect()
    {
        return this.paddleElem.getBoundingClientRect()
    }
    //to reset to center
    reset()
    {
        this.position=50
    }
    update(delta,ballHeight)
    {
        // make our paddle follow wherever the ball is on screen
        //computer becomes unbeatable when -> this.position=ballHeight;
        //num is larger when the ball is farther
        this.position += SPEED * delta *(ballHeight -this.position) 
    }
}
