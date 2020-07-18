{
// For First Time Player
if(localStorage.getItem('lastWinner') == null){
    alert('Press Enter to Start OR Stop the game');
}
    
let rodOne = document.getElementById("rod-one");
let rodTwo = document.getElementById("rod-two");
let ball = document.getElementById("ball");
let gameStarted = false;
let xSpeed = 2;
let ySpeed = 2;
let rodSpeed = 20;
let interval;
let diameter = 20;
let alreadyUpdated;
let score = 0;

// function to reset Board
const resetBoard = (
    function(){
        let resetBoard = function(){
            let rodOnePosition = (window.innerWidth / 2) - (rodOne.getBoundingClientRect().width / 2);
            let rodTwoPosition = (window.innerWidth / 2) - (rodTwo.getBoundingClientRect().width / 2) ;
            rodOne.style.left =  rodOnePosition + "px";
            rodTwo.style.left = rodTwoPosition + "px";
            let ballPosition = (window.innerWidth / 2) - (ball.getBoundingClientRect().width / 2);
            ball.style.left  = ballPosition + "px";
            alreadyUpdated = false;
            if(localStorage.getItem('lastWinner') == null){
                ball.style.top = rodOne.getBoundingClientRect().height;
                localStorage.setItem('maxScore', 0);
                localStorage.setItem('Player One', 0);
                localStorage.setItem('Player Two', 0);
            }else if(localStorage.getItem('lastWinner') == "Player One"){
                ball.style.bottom = rodTwo.getBoundingClientRect().height;
                xSpeed = -2;
                ySpeed = -2;
            }else if(localStorage.getItem('lastWinner') == "Player Two"){
                ball.style.top = rodOne.getBoundingClientRect().height;
                xSpeed = 2;
                ySpeed = 2;
            }
        }
        resetBoard();
        return resetBoard;
    }
)();

// on resize reset the board
window.onresize = function(){
    resetBoard();
    gameStarted = false;
}

// Add 'keypress' eventlistener to window object
window.addEventListener('keypress', function(event){
    if(event.code === "Enter"){
        if(!gameStarted){
            gameStarted = true;
        }else{
            gameStarted = false;
        }
    }

    // console.log(event);
    if(gameStarted && event.code === "KeyA"){
        // console.log(event);
        let rodOnePosition = rodOne.getBoundingClientRect().x - rodSpeed;
        let rodTwoPosition = rodTwo.getBoundingClientRect().x - rodSpeed;
        if(rodOnePosition >= 0){
            rodOne.style.left = rodOnePosition + "px";
            rodTwo.style.left = rodTwoPosition + "px";
        }
    }else if(gameStarted && event.code === "KeyD"){
        // console.log(event);
        let rodOnePosition = rodOne.getBoundingClientRect().x + rodSpeed;
        let rodTwoPosition = rodTwo.getBoundingClientRect().x + rodSpeed;
        if(rodOnePosition <= window.innerWidth - rodOne.getBoundingClientRect().width){
            rodOne.style.left = rodOnePosition + "px";
            rodTwo.style.left = rodTwoPosition + "px";
        }
    }
    startAndStopBallMovement();
});

function startAndStopBallMovement(){
    if(gameStarted && alreadyUpdated == false){
        alreadyUpdated = true;
        interval = setInterval(function(){
            let newXPosition = ball.getBoundingClientRect().x + xSpeed;
            let newYPosition = ball.getBoundingClientRect().y + ySpeed;
            if(newXPosition + diameter >= window.innerWidth  || newXPosition < 0){
                xSpeed = -xSpeed;
            }


            let tempTwo = rodTwo.getBoundingClientRect();
            let tempOne = rodOne.getBoundingClientRect();

            if(newYPosition + diameter + tempTwo.height >= window.innerHeight){
                
                if(tempTwo.x <= newXPosition && tempTwo.x + tempTwo.width >= newXPosition){
                    console.log("rod Two");
                    score++;
                    ySpeed = -ySpeed; 
                }
            }

            if(newYPosition <= tempOne.height){
                
                if(tempOne.x <= newXPosition && tempOne.x + tempOne.width >= newXPosition){
                    console.log("rod One");
                    score++;
                    ySpeed = -ySpeed; 
                }
            }

            if(newYPosition + diameter >= window.innerHeight  || newYPosition < 0){
                  if(newYPosition + diameter >= window.innerHeight){
                      localStorage.setItem('lastWinner', "Player One");
                      localStorage.setItem('Player One', parseInt(localStorage.getItem('Player One')) + 1);
                  }
                  if(newYPosition < 0){
                    localStorage.setItem('lastWinner', "Player Two");
                    localStorage.setItem('Player Two', parseInt(localStorage.getItem('Player Two')) + 1);
                }
                localStorage.setItem('maxScore', Math.max(parseInt(localStorage.getItem('maxScore')), score));
                clearInterval(interval); 
                // alert("Player One:" + localStorage.getItem('Player One') + " Player Two: " + localStorage.getItem('Player Two')); 
                alert("Current Score: " + score + " Maximum Score: " + localStorage.getItem('maxScore'));
                alert("Thakyou for Playing Game!!!!");
                window.location.reload(); 
            }
            ball.style.left  = newXPosition + "px";
            ball.style.top = newYPosition + "px";
        } ,10);
    }else if(!gameStarted){
        clearInterval(interval);
        alreadyUpdated = false;
    }
}


}