var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var gameStart=false;

//if a button is clicked by user

$(".btn").click(function() {


  var userChosenColour = $(this).attr("id");


  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  Sound(userChosenColour);
  checkanswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);

});


function nextsequence(){

  userClickedPattern=[];

  level++;

  $("#level-title").text("Level "+ level);

  var randomnumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomnumber];
  gamePattern.push(randomChosenColour);
  var queryid="#"+randomChosenColour;
  Sound(randomChosenColour);
  $(queryid).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}

// function that creats sound

function Sound(c){
  switch (c) {
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;

    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();

      break;

    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();

      break;

    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();

      break;

    default:
      alert("HAHA");

  }
}

// function for animation on button click

function animatePress(currentColour){
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

//game start if with is pressed

$(document).keydown(function(){
  if(!gameStart){
    $("#level-title").text("Level " + level);
    nextsequence();
    gameStart=true;
  }
});

//functionto check the answer

function checkanswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextsequence();
      }, 1000);

    }

  } else{
    console.log("wrong");
    Sound("wrong");


    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  gameStart=false;

}
