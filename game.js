const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var isGameHasStarted = false;

$(document).keypress(function (event) {
    if (!isGameHasStarted) {
        $('h1').text("Level " + (level));
        nextSequence();
        isGameHasStarted = true;
    }
});


// Start game For mobile users via the Start button
$("#start-btn").click(function () {
    if (!isGameHasStarted) {
        $('h1').text("Level " + level);
        nextSequence();
        isGameHasStarted = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $('h1').text("Level " + (level));

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$("div.btn").click(function (event) {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length);

    if ((gamePattern.length == userClickedPattern.length) && isGameHasStarted) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else if (!isGameHasStarted) {
        gameOver();
    }
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if ((gamePattern.length != 0) && (gamePattern[currentLevel - 1] == userClickedPattern[currentLevel - 1])) {
        isGameHasStarted = true;
    } else {
        isGameHasStarted = false;
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $('h1').text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    restartGame();
}

function restartGame() {
    level = 0;
    gamePattern = [];
    isGameHasStarted = false;
    userClickedPattern = [];
}






