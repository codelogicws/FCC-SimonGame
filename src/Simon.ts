///<reference path='../typings/browser/definitions/lodash/index.d.ts'/>

// What todo
/*
- test if the button I pressed is right while keeping state on progress
- play the combo of colors
- change speed of combo playback
- displaying colors as needed
  - probably just using interval runs

User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

User Story: I can see how many steps are in the current series of button presses.

User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.

User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.
*/
let comboMemory:BUTTONCOLOR[] = [];
let userIndex:number = 0;
let playbackID:number;
let userTurn:boolean = false;

function gameStart(){
  newColor()
  playColors()

  console.log(userIndex);
}


function getCombo(){
  return comboMemory
}

function newColor(){
   let random:number = Math.floor(   Math.random() * (4 - 0) + 0)
   comboMemory.push(random)
}

function playColors(){
   playbackID = window.setInterval(playNextNumber, 1000)
}

function playNextNumber(){
  console.log(BUTTONCOLOR[comboMemory[userIndex++]]);
  if (  switchTurn()  ){
    //terminate
    clearInterval(playbackID);
    userTurn = true;
    userIndex = 0;
  }
}

function switchTurn(){
  return userIndex >= comboMemory.length - 1;
}

function pressColor(color:BUTTONCOLOR){
  if(userTurn){
    debugger;
    if(color == comboMemory[userIndex]){
      debugger;
      userIndex++;
      checkIfDone()
    }else{
      endGame();
    }
  }
}

function checkIfDone(){
  if(switchTurn){
    alert("you are done for now");
  }
}

function endGame(){
  alert("You lose!")

}

enum BUTTONCOLOR{
  BLUE,
  GREEN,
  RED,
  YELLOW
}

gameStart()
