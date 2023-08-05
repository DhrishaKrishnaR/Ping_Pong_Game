const INITIAL_VELOCITY =0.025
const VELOCITY_INCREASE = 0.00001//very small value should be given at start
class Ball
{
    constructor(ballElem)
    {
        this.ballElem=ballElem
        this.reset()
        
    }
    //get x and set x are helper functions 
    get x()
    {
        //take the css value 50 and converted to js value that we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }
    set x(value)
    {
        this.ballElem.style.setProperty("--x",value)
    }
    get y()
    {
        //take the css value 50 and converted to js value that we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }
    set y(value)
    {
        this.ballElem.style.setProperty("--y",value)
    }
    //position of the ball
    rect()
    {
        return this.ballElem.getBoundingClientRect()
    }
    reset()
    {
        this.x= 50
        this.y= 50
        //direction is a combination of x and y in a graph
        this.direction={x:0 }
        //make sure the ball goes far right and left in while
        //.9 side to side and .2 -> up and down
        while(
            Math.abs(this.direction.x) <= 0.2 || 
            Math.abs(this.direction.x )>= 0.9)
        {
            //2* PI =360 to determine the direction...it gives in radians .. with radians we need to use cos and sin 
            const heading = this.randomNumberBetween(0,2 * Math.PI);
            //math.cos(heading) gives the unit vector
            this.direction={x:Math.cos(heading),y:Math.sin(heading)};
        }
        //speed
        this.velocity=INITIAL_VELOCITY
    }
    //ball direction are x and y
    update(delta, paddleRects)
    {
        //move the x position in that direction in the given velocity
        //multiply delta to handle long delay
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta
        //speed up the ball motion
        const rect=this.rect();
        //if it gone past the bottom or top of the screen
        if(rect.bottom >=window.innerHeight || rect.top<=0)
        {
            //flip the y direction if it hit up and down it get bounced back
            this.direction.y *= -1  
        }
        if(paddleRects.some(r=> this.isCollision(r,rect)))
        {
            //if collision is true then returns true
            this.direction.x *= -1
            
        } 
        /*if(rect.right >=window.innerWidth || rect.left<=0)
        {
            //flip the x direction if it hit right and left it get bounced back
            this.direction.x *= -1  
        }*/
    }
    randomNumberBetween(min,max)
    {
        return Math.random()*(max - min) +min;
    }
    isCollision(rect1, rect2) {
        return (
            rect1.left <= rect2.right &&
            rect1.right >= rect2.left &&
            rect1.top <= rect2.bottom &&
            rect1.bottom >= rect2.top
        );
    }
    
}
