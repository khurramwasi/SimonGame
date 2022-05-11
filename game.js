var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Function for random selection of next nextSequence
// Starting the game
var level = 0;
var started = true;

$(document).keypress(function(event) {
  if (started) {
    $("#level-title").text("Level " + level);
    // nextSequence(level);
    nextSequence();
    started = false;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // animatePress(randomChosenColour);
  playSound(randomChosenColour);
  }

//User Click actions
$(".btn").click(function() {
if (!started){
  var userChosenColour = $(this).attr('id')
  userClickedPattern.push(userChosenColour);
  var indexLastAnswer = userClickedPattern.length - 1
  animatePress(userChosenColour);
  checkAnswer(indexLastAnswer);
  playSound(userChosenColour);

}
});

//Sound Play function

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Adding Animations to Clicked or random select button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    //Wrong answer audio,animation play and Game over message
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press any key to restart");
    //Game Restart on keypress
    startOver();
  }
}
//Restart function
function startOver(){
  level = 0;
  started = true;
  gamePattern = [];
  }
