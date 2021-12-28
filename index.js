let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let highScore = [0];
let level = 0;
let startOnce = false;
let sec = 3;


//Starting the game
function startTheGame() {
    
    $(".start").on("click", () => {

        // const timer = setInterval(myTimer,1000) 
        // function myTimer() {
        //     if(sec==-1){
        //         clearInterval(timer);
        //     }
        //     else{
        //         $(".start").text("Starting in "+sec);
        //         sec--;
        //     }
        // }

        if(startOnce==true){
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
            startOnce = false;
            sec = 3
        }

        $(".level-no").removeClass("highScoreEffect").css("display", "block").text("Level " + level);

        setTimeout(() => {
            if (startOnce == false) {
                $(".level-no").css("display", "none").text("Level " + level);
                nextSequence();
                startOnce = true;
            }
        }, 2000);


    });

}


//Generating random sequences of colors
function nextSequence() {

    level++;
    $(".level-no").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Selecting button with id as randomChosenColor;

    // console.log(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);

    //Playing sounds according to the selected elements;
    playSound(randomChosenColor);

}


// Checking which color was chosen when user clicks a button
$(".btn").on("click", (event) => {
    // alert("Clicked");
    let userChosenColor = event.target.id;
    // alert(userChosenColor);
    userClickedPattern.push(userChosenColor);
    // alert(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
})


//Validating the sequence generated with the user answer
function checkAnswer(currentLevel) {
    // This is giving correct output
    // alert(gamePattern);
    // alert(userClickedPattern);

    //Checking this....

    //It's working
    let flag = false;
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] != gamePattern[i]) {
            // alert("Failure");
            flag = true;
            break;
        }
    }

    if (flag) {
        let audioWrong = new Audio("./sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");

        let score = 0;
        if(level>=highScore[0]){
            highScore[0] = level-1;
            $(".level-no").addClass("highScoreEffect").css("display","block").text("High score: "+highScore[0]);
        }
        else{
            score = highScore[0];
            --score;
            $(".level-no").addClass("highScoreEffect").css("display","block").text("Level "+score);            
        }

        $(".start").text("Restart");
        setTimeout(() => {
            // $(".level-no").css("display","none").text("Level "+level);

            $("body").removeClass("game-over");
        }, 500);

        restartGame();
    }

    // If it's correct generating the next random sequence
    else if (!flag) {
        if (userClickedPattern.length == gamePattern.length) {
            $(".level-no").css("display","block").text("Level "+level).css("color", userClickedPattern[userClickedPattern.length-1]);
            userClickedPattern = [];
            setTimeout(() => {
                $(".level-no").css("display","none").text("Level "+level);
                nextSequence();
            }, 1000);
        }
    }
}

//Restarting the game if the user loses
function restartGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    startOnce = false;
    sec = 3
    startTheGame();

}


// *************************** SOUNDS AND ANIMATIONS**************************

//Playing sounds on random and on click
function playSound(name) {

    let audioext = new Audio("./sounds/" + name + ".mp3");
    audioext.play();
}


//Animating the buttons on the clicks
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(".main-menu-sdown").click(() => {
    $(".temp").slideDown("slow");
})

//Clicks the Main -menu button
$(".main-menu-sdown").click(() => {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    startOnce = false;
    $(".level-no").css("display","none");
    $(".start").text("Start");
})


//START THE GAME
$(".play").click(() => {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    startOnce = false;
    sec = 3
    $(".temp").slideUp("slow");
    startTheGame();
})










